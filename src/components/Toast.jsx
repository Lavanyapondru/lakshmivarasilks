import { useShop } from "../context/ShopContext";

export default function Toast() {
  const { toast } = useShop();

  if (!toast.show) return null;

  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return "bi-check-circle-fill text-success";
      case "error":
        return "bi-exclamation-triangle-fill text-danger";
      default:
        return "bi-info-circle-fill text-primary";
    }
  };

  return (
    <div
      className="custom-toast-container position-fixed bottom-0 end-0 p-3"
      style={{ zIndex: 3000 }}
    >
      <div className="custom-toast shadow-lg rounded-4 p-3 d-flex align-items-center gap-3">
        <i className={`bi ${getIcon()} fs-4`}></i>
        <div className="flex-grow-1">
          <p className="m-0 fw-semibold text-dark small">{toast.message}</p>
        </div>
      </div>
    </div>
  );
}
