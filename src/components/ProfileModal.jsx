
import { useEffect, useState } from "react";
import { useShop, formatPrice } from "../context/ShopContext";

const getAddressKey = (email) => `lvs-addresses-${email || "guest"}`;

export default function ProfileModal() {
  const {
    user,
    orders,
    isProfileOpen,
    setIsProfileOpen,
    logout,
    updateUserAddress,
    setIsWishlistOpen,
    setIsCartOpen,
  } = useShop();

  const [activeTab, setActiveTab] = useState("orders");
  const [savedAddresses, setSavedAddresses] = useState([]);
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const [isAddingAddress, setIsAddingAddress] = useState(false);
  const [locationLoading, setLocationLoading] = useState(false);
  const [addressMessage, setAddressMessage] = useState("");

  const createEmptyAddress = () => ({
    id: "",
    label: "Home",
    fullName: user?.address?.fullName || user?.name || "",
    phone: user?.address?.phone || user?.phone || "",
    street: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [editAddress, setEditAddress] = useState(createEmptyAddress);

  // Load saved addresses for the current user.
  useEffect(() => {
    if (!user) return;

    let addresses = [];

    try {
      addresses = JSON.parse(
        localStorage.getItem(getAddressKey(user.email)) || "[]"
      );
    } catch {
      addresses = [];
    }

    if (!Array.isArray(addresses)) addresses = [];

    if (addresses.length === 0 && user.address) {
      const hasAddress = [
        user.address.street,
        user.address.city,
        user.address.state,
        user.address.pincode,
      ].some(Boolean);

      if (hasAddress) {
        addresses = [
          {
            ...user.address,
            id: "default-address",
            label: "Home",
          },
        ];
      }
    }

    setSavedAddresses(addresses);

    const defaultAddress =
      addresses.find((address) => address.isDefault) ||
      addresses[0];

    setSelectedAddressId(defaultAddress?.id || "");
    setEditAddress(defaultAddress || createEmptyAddress());
    setIsAddingAddress(false);
    setAddressMessage("");
  }, [user]);

  if (!isProfileOpen || !user) return null;

  const saveAddressList = (addresses) => {
    setSavedAddresses(addresses);

    try {
      localStorage.setItem(
        getAddressKey(user.email),
        JSON.stringify(addresses)
      );
    } catch {
      setAddressMessage("Could not save addresses in this browser.");
    }
  };

  const selectAddress = (address) => {
    setSelectedAddressId(address.id);
    setEditAddress({ ...address });
    setIsAddingAddress(false);
    setAddressMessage("");
  };

  const handleSaveAddress = (event) => {
    event.preventDefault();
    setAddressMessage("");

    const requiredFields = [
      editAddress.fullName,
      editAddress.phone,
      editAddress.street,
      editAddress.city,
      editAddress.state,
      editAddress.pincode,
    ];

    if (requiredFields.some((value) => !String(value || "").trim())) {
      setAddressMessage("Please complete all address fields.");
      return;
    }

    if (!/^\d{6}$/.test(editAddress.pincode.trim())) {
      setAddressMessage("Please enter a valid 6-digit Indian PIN code.");
      return;
    }

    const id =
      isAddingAddress || !selectedAddressId
        ? `address-${Date.now()}`
        : selectedAddressId;

    const addressToSave = {
      ...editAddress,
      id,
      label: editAddress.label || "Home",
      fullName: editAddress.fullName.trim(),
      phone: editAddress.phone.trim(),
      street: editAddress.street.trim(),
      city: editAddress.city.trim(),
      state: editAddress.state.trim(),
      pincode: editAddress.pincode.trim(),
    };

    const exists = savedAddresses.some(
      (address) => address.id === id
    );

    const updated = exists
      ? savedAddresses.map((address) =>
          address.id === id ? addressToSave : address
        )
      : [...savedAddresses, addressToSave];

    saveAddressList(updated);
    setSelectedAddressId(id);
    setEditAddress(addressToSave);
    setIsAddingAddress(false);

    // Update the application's existing user address.
    updateUserAddress(addressToSave);

    setAddressMessage("Address saved successfully!");
  };

  const handleSelectDefault = (id) => {
    const updated = savedAddresses.map((address) => ({
      ...address,
      isDefault: address.id === id,
    }));

    saveAddressList(updated);
    setSelectedAddressId(id);

    const selected = updated.find((address) => address.id === id);

    if (selected) {
      setEditAddress({ ...selected });
      updateUserAddress(selected);
    }

    setAddressMessage("Default delivery address updated.");
  };

  const handleDeleteAddress = (id) => {
    const updated = savedAddresses.filter(
      (address) => address.id !== id
    );

    // Keep a default address if any saved address remains.
    if (updated.length > 0 && !updated.some((address) => address.isDefault)) {
      updated[0] = { ...updated[0], isDefault: true };
    }

    saveAddressList(updated);

    const next =
      updated.find((address) => address.isDefault) || updated[0];

    setSelectedAddressId(next?.id || "");
    setEditAddress(next ? { ...next } : createEmptyAddress());
    setIsAddingAddress(false);

    if (next) {
      updateUserAddress(next);
    }

    setAddressMessage("Address removed.");
  };

  const handleAddAddress = () => {
    setEditAddress(createEmptyAddress());
    setSelectedAddressId("");
    setIsAddingAddress(true);
    setAddressMessage("");
  };

  const detectCurrentLocation = () => {
    setAddressMessage("");

    if (!navigator.geolocation) {
      setAddressMessage("Geolocation is not supported by this browser.");
      return;
    }

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    if (!apiKey) {
      setAddressMessage(
        "Google Maps API key is missing. Configure VITE_GOOGLE_MAPS_API_KEY in your .env file."
      );
      return;
    }

    setLocationLoading(true);

    navigator.geolocation.getCurrentPosition(
      async ({ coords }) => {
        try {
          const params = new URLSearchParams({
            latlng: `${coords.latitude},${coords.longitude}`,
            key: apiKey,
            language: "en",
          });

          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?${params}`
          );

          if (!response.ok) {
            throw new Error("Google Maps request failed.");
          }

          const data = await response.json();

          if (data.status !== "OK" || !data.results?.length) {
            throw new Error(
              data.error_message ||
                "Could not find an address for your location."
            );
          }

          const result = data.results[0];
          const components = result.address_components || [];

          const findComponent = (...types) =>
            components.find((component) =>
              types.some((type) => component.types.includes(type))
            )?.long_name || "";

          const streetNumber = findComponent("street_number");
          const route = findComponent("route");
          const neighborhood = findComponent(
            "sublocality_level_1",
            "sublocality",
            "neighborhood"
          );

          const streetParts = [
            streetNumber,
            route,
            neighborhood,
          ].filter(Boolean);

          setEditAddress((previous) => ({
            ...previous,
            street:
              streetParts.join(", ") ||
              result.formatted_address ||
              previous.street,
            city:
              findComponent("locality", "postal_town") ||
              findComponent("administrative_area_level_2") ||
              previous.city,
            state:
              findComponent("administrative_area_level_1") ||
              previous.state,
            pincode:
              findComponent("postal_code") || previous.pincode,
          }));

          setAddressMessage(
            "Location detected. Please verify the address and save it."
          );
        } catch (error) {
          setAddressMessage(
            error.message || "Unable to retrieve your address."
          );
        } finally {
          setLocationLoading(false);
        }
      },
      (error) => {
        setLocationLoading(false);

        if (error.code === 1) {
          setAddressMessage(
            "Location permission denied. Allow location access in your browser."
          );
        } else if (error.code === 2) {
          setAddressMessage("Your current location could not be determined.");
        } else {
          setAddressMessage("Location request timed out. Please try again.");
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 60000,
      }
    );
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-success text-white";
      case "Shipped":
        return "bg-info text-dark";
      case "Confirmed":
        return "bg-primary text-white";
      default:
        return "bg-secondary text-white";
    }
  };

  return (
    <div
      className="modal fade show d-block modal-backdrop-custom"
      tabIndex="-1"
      role="dialog"
      aria-modal="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg profile-modal-dialog">
        <div className="modal-content rounded-4 border-0 shadow-lg overflow-hidden">

          {/* HEADER */}
          <div className="modal-header border-bottom px-4 py-3 d-flex justify-content-between align-items-center bg-light">
            <div className="d-flex align-items-center gap-3">
              <div className="user-avatar-circle shadow-sm">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>

              <div>
                <h5 className="modal-title fw-bold m-0">
                  {user.name}
                </h5>
                <small className="text-muted d-block">
                  {user.email} • {user.phone}
                </small>
              </div>
            </div>

            <button
              type="button"
              className="btn-close"
              onClick={() => setIsProfileOpen(false)}
              aria-label="Close"
            />
          </div>

          {/* NAVIGATION TABS */}
          <div className="px-4 py-2 bg-white border-bottom d-flex gap-2 flex-wrap">
            <button
              type="button"
              className={`btn btn-sm rounded-pill px-3 ${
                activeTab === "orders" ? "btn-brand" : "btn-light"
              }`}
              onClick={() => setActiveTab("orders")}
            >
              <i className="bi bi-box-seam me-1" />
              My Orders ({orders.length})
            </button>

            <button
              type="button"
              className={`btn btn-sm rounded-pill px-3 ${
                activeTab === "address" ? "btn-brand" : "btn-light"
              }`}
              onClick={() => setActiveTab("address")}
            >
              <i className="bi bi-geo-alt me-1" />
              Saved Address
            </button>

            <button
              type="button"
              className="btn btn-sm btn-light rounded-pill px-3"
              onClick={() => {
                setIsProfileOpen(false);
                setIsWishlistOpen(true);
              }}
            >
              <i className="bi bi-heart me-1 text-danger" />
              Wishlist
            </button>

            <button
              type="button"
              className="btn btn-sm btn-light rounded-pill px-3"
              onClick={() => {
                setIsProfileOpen(false);
                setIsCartOpen(true);
              }}
            >
              <i className="bi bi-bag me-1 text-brand" />
              Cart
            </button>

            <button
              type="button"
              className="btn btn-sm btn-outline-danger rounded-pill px-3 ms-auto"
              onClick={logout}
            >
              <i className="bi bi-box-arrow-right me-1" />
              Logout
            </button>
          </div>

          {/* BODY */}
          <div
            className="modal-body p-4"
            style={{ maxHeight: "65vh", overflowY: "auto" }}
          >
            {activeTab === "orders" ? (
              <div>
                <h6 className="fw-bold mb-3">Order History</h6>

                {orders.length === 0 ? (
                  <div className="text-center py-5">
                    <i className="bi bi-bag-x text-muted display-4 mb-2 d-block" />
                    <p className="text-muted mb-3">
                      You haven't placed any orders yet.
                    </p>
                    <button
                      type="button"
                      className="btn btn-brand btn-sm"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="d-flex flex-column gap-3">
                    {orders.map((ord) => (
                      <div
                        key={ord.id}
                        className="order-history-card border rounded-3 p-3 bg-white"
                      >
                        <div className="d-flex justify-content-between align-items-start border-bottom pb-2 mb-2 flex-wrap gap-2">
                          <div>
                            <span className="fw-bold text-dark">
                              {ord.id}
                            </span>
                            <span className="text-muted small ms-2">
                              • {ord.date}
                            </span>
                          </div>

                          <div className="d-flex align-items-center gap-2">
                            <span
                              className={`badge ${getStatusBadge(
                                ord.status
                              )} rounded-pill`}
                            >
                              {ord.status}
                            </span>
                            <span className="fw-bold text-brand">
                              {formatPrice(ord.total)}
                            </span>
                          </div>
                        </div>

                        {/* TRACKING */}
                        <div className="tracking-timeline py-2 px-1">
                          <div className="d-flex justify-content-between position-relative">
                            {[
                              "Placed",
                              "Confirmed",
                              "Shipped",
                              "Delivered",
                            ].map((step, index) => {
                              const stepNumber = index + 1;
                              const completed =
                                (ord.trackingStep || 2) >= stepNumber;

                              return (
                                <div
                                  key={step}
                                  className="text-center"
                                  style={{ flex: 1, position: "relative" }}
                                >
                                  <div
                                    className={`step-dot mx-auto rounded-circle d-flex align-items-center justify-content-center ${
                                      completed
                                        ? "bg-success text-white"
                                        : "bg-light text-muted border"
                                    }`}
                                    style={{
                                      width: 26,
                                      height: 26,
                                      fontSize: 12,
                                      zIndex: 2,
                                    }}
                                  >
                                    {completed ? (
                                      <i className="bi bi-check" />
                                    ) : (
                                      stepNumber
                                    )}
                                  </div>

                                  <small
                                    className="d-block mt-1 text-muted"
                                    style={{ fontSize: 11 }}
                                  >
                                    {step}
                                  </small>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* ORDER ITEMS */}
                        <div className="pt-2 border-top mt-2">
                          <div className="row g-2">
                            {(ord.items || []).map((item, index) => (
                              <div
                                key={item.id || index}
                                className="col-sm-6"
                              >
                                <div className="d-flex align-items-center gap-2 bg-light p-2 rounded-2">
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    style={{
                                      width: 36,
                                      height: 36,
                                      objectFit: "cover",
                                      borderRadius: 4,
                                    }}
                                  />

                                  <div className="small flex-grow-1">
                                    <div
                                      className="text-truncate fw-semibold"
                                      style={{ maxWidth: 160 }}
                                    >
                                      {item.name}
                                    </div>
                                    <div className="text-muted small">
                                      Qty: {item.quantity} • Size:{" "}
                                      {item.size || "N/A"}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="d-flex justify-content-between align-items-center mt-2 pt-2 border-top small text-muted">
                            <span>
                              Paid via:{" "}
                              <strong>{ord.paymentMethod || "N/A"}</strong>
                            </span>
                            <span>
                              Delivery:{" "}
                              <strong>
                                {ord.address?.city || "Address on file"}
                              </strong>
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              /* SAVED ADDRESS TAB */
              <div>
                <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
                  <div>
                    <h6 className="fw-bold mb-1">
                      Saved Delivery Addresses
                    </h6>
                    <p className="text-muted small mb-0">
                      Add, edit, or select your delivery address.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="btn btn-brand rounded-pill px-3"
                    onClick={handleAddAddress}
                  >
                    <i className="bi bi-plus-lg me-2" />
                    Add New Address
                  </button>
                </div>

                {/* SAVED ADDRESS CARDS */}
                {savedAddresses.length > 0 && (
                  <div className="row g-3 mb-4">
                    {savedAddresses.map((address) => (
                      <div className="col-md-6" key={address.id}>
                        <div
                          className={`saved-address-card ${
                            selectedAddressId === address.id
                              ? "selected"
                              : ""
                          }`}
                        >
                          <div className="d-flex justify-content-between gap-2">
                            <label className="d-flex gap-2 flex-grow-1">
                              <input
                                type="radio"
                                name="selectedAddress"
                                checked={
                                  selectedAddressId === address.id
                                }
                                onChange={() => selectAddress(address)}
                              />

                              <div>
                                <strong>
                                  {address.label || "Home"}
                                </strong>

                                {address.isDefault && (
                                  <span className="badge bg-success ms-2">
                                    Default
                                  </span>
                                )}

                                <div className="small mt-2">
                                  {address.fullName}
                                </div>
                                <div className="text-muted small">
                                  {address.street}
                                </div>
                                <div className="text-muted small">
                                  {address.city}, {address.state}{" "}
                                  {address.pincode}
                                </div>
                                <div className="text-muted small">
                                  {address.phone}
                                </div>
                              </div>
                            </label>

                            <button
                              type="button"
                              className="btn btn-sm btn-outline-secondary align-self-start"
                              title="Edit address"
                              onClick={() => selectAddress(address)}
                            >
                              <i className="bi bi-pencil" />
                            </button>
                          </div>

                          <div className="d-flex gap-3 flex-wrap mt-3">
                            <button
                              type="button"
                              className="btn btn-sm btn-link p-0 text-decoration-none"
                              onClick={() =>
                                handleSelectDefault(address.id)
                              }
                            >
                              Set as default
                            </button>

                            <button
                              type="button"
                              className="btn btn-sm btn-link p-0 text-danger text-decoration-none"
                              onClick={() =>
                                handleDeleteAddress(address.id)
                              }
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <hr />

                <h6 className="fw-bold mb-3">
                  {isAddingAddress
                    ? "Add Delivery Address"
                    : "Edit Delivery Address"}
                </h6>

                {/* CURRENT LOCATION */}
                <button
                  type="button"
                  className="btn btn-outline-danger rounded-pill mb-2"
                  onClick={detectCurrentLocation}
                  disabled={locationLoading}
                >
                  {locationLoading ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Detecting location...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-crosshair me-2" />
                      Use My Current Location
                    </>
                  )}
                </button>

                <p className="small text-muted">
                  Your browser will ask permission to access your location.
                  Please verify the detected address before saving.
                </p>

                {addressMessage && (
                  <div
                    className="alert alert-light border small"
                    role="status"
                  >
                    {addressMessage}
                  </div>
                )}

                {/* ADDRESS FORM */}
                <form onSubmit={handleSaveAddress}>
                  <div className="row g-3">
                    <div className="col-sm-6">
                      <label className="form-label small fw-semibold">
                        Address Label
                      </label>
                      <select
                        className="form-select"
                        value={editAddress.label || "Home"}
                        onChange={(event) =>
                          setEditAddress({
                            ...editAddress,
                            label: event.target.value,
                          })
                        }
                      >
                        <option value="Home">Home</option>
                        <option value="Work">Work</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="col-sm-6">
                      <label className="form-label small fw-semibold">
                        Full Name
                      </label>
                      <input
                        className="form-control"
                        required
                        value={editAddress.fullName || ""}
                        onChange={(event) =>
                          setEditAddress({
                            ...editAddress,
                            fullName: event.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="col-sm-6">
                      <label className="form-label small fw-semibold">
                        Contact Phone
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        required
                        value={editAddress.phone || ""}
                        onChange={(event) =>
                          setEditAddress({
                            ...editAddress,
                            phone: event.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="col-12">
                      <label className="form-label small fw-semibold">
                        Address (Street / Flat / Colony)
                      </label>
                      <input
                        className="form-control"
                        required
                        value={editAddress.street || ""}
                        onChange={(event) =>
                          setEditAddress({
                            ...editAddress,
                            street: event.target.value,
                          })
                        }
                        placeholder="House number, street, colony"
                      />
                    </div>

                    <div className="col-sm-4">
                      <label className="form-label small fw-semibold">
                        City
                      </label>
                      <input
                        className="form-control"
                        required
                        value={editAddress.city || ""}
                        onChange={(event) =>
                          setEditAddress({
                            ...editAddress,
                            city: event.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="col-sm-4">
                      <label className="form-label small fw-semibold">
                        State
                      </label>
                      <input
                        className="form-control"
                        required
                        value={editAddress.state || ""}
                        onChange={(event) =>
                          setEditAddress({
                            ...editAddress,
                            state: event.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="col-sm-4">
                      <label className="form-label small fw-semibold">
                        PIN Code
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        maxLength={6}
                        pattern="[0-9]{6}"
                        className="form-control"
                        required
                        value={editAddress.pincode || ""}
                        onChange={(event) =>
                          setEditAddress({
                            ...editAddress,
                            pincode: event.target.value,
                          })
                        }
                      />
                    </div>
                  </div>

                  <div className="d-flex flex-wrap gap-2 mt-4">
                    <button
                      type="submit"
                      className="btn btn-brand px-4 rounded-pill"
                    >
                      <i className="bi bi-check2-circle me-2" />
                      {isAddingAddress
                        ? "Save New Address"
                        : "Save Address Changes"}
                    </button>

                    {isAddingAddress && (
                      <button
                        type="button"
                        className="btn btn-light rounded-pill px-4"
                        onClick={() => {
                          setIsAddingAddress(false);
                          const existing =
                            savedAddresses.find(
                              (address) =>
                                address.id === selectedAddressId
                            ) || savedAddresses[0];

                          setEditAddress(
                            existing
                              ? { ...existing }
                              : createEmptyAddress()
                          );
                          setSelectedAddressId(existing?.id || "");
                          setAddressMessage("");
                        }}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
