const offers = [
  "10% OFF",
  "15% OFF",
  "20% OFF",
  "25% OFF",
  "30% OFF",
  "35% OFF",
  "40% OFF",
  "Buy 1 Get 1",
  "Buy 1 Get 1",
  "Flat ₹100 OFF",
  "Flat ₹200 OFF"
];

const generateMrp = (price) => {
  const numericPrice = parseInt(price.replace(/[₹,]/g, ""), 10);

  const multipliers = [1.25, 1.35, 1.4, 1.5, 1.6, 1.75, 2];

  const multiplier =
    multipliers[Math.floor(Math.random() * multipliers.length)];

  return `₹${Math.ceil((numericPrice * multiplier) / 100) * 100}`;
};

const getRandomOffer = () => {
  return offers[Math.floor(Math.random() * offers.length)];
};

export const products = [

{
  id: 101,
  name: "Hydrating Face Serum",
  category: "Skincare",
  price: 199,
  mrp: 249,
  image: "/images/serum.jpg",

  availableSizes: [
    { label: "30 ml", price: 199, mrp: 249 },
    { label: "50 ml", price: 299, mrp: 349 },
    { label: "100 ml", price: 499, mrp: 599 },
  ],
},
  {id:14,category:"clothing",subcategory: "ethnic",name:"Elegant ethnic cotton kurta",price:"₹2,499",badge:"Bestseller",image:"https://images.jdmagicbox.com/quickquotes/images_main/women-s-ethnic-wear-q50h11c1.jpg"},
 {id:3,category:"clothing",subcategory: "lounge",name:"Everyday Kurti",price:"₹899",badge:"Popular",image:"https://ekantastudio.com/cdn/shop/files/B27A5B45-B13B-465E-BC67-09A0050BDC34_29e11d56-2b14-4cb7-9ce4-fc1b617a7ba3.png?v=1769603173"},
 {id:4,category:"clothing",subcategory: "western",name:"Soft Lounge Set",price:"₹999",badge:"Comfort",image:"https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=80"},
 {id:5,category:"clothing",subcategory: "lounge",name:"Comfort Cotton Dress",price:"₹499",badge:"Essentials",image:"https://m.media-amazon.com/images/I/710DYN2Us0L._AC_UY1100_.jpg"},
{id:15,category:"clothing",subcategory: "western",name:"Casual Western Wear",price:"₹999",badge:"Comfort",image:"https://cdn.shopify.com/s/files/1/0383/1771/9684/files/Chiba_Three_Piece_Co-ord_Set_1.webp?v=1772006712"},
{id:13,category:"clothing",subcategory: "ethnic",name:"Flare Maxi Ethnic Dress With Dupatta",price:"₹2,499",badge:"Bestseller",image:"https://assets.myntassets.com/w_412,q_50,,dpr_3,fl_progressive,f_webp/assets/images/26164080/2023/12/1/1fda0e18-b821-477c-b6cb-82a612d0e34c1701424103141EthnicDresses1.jpg"},
 {id:1,category:"clothing",subcategory: "ethnic",name:"Festive Anarkali Set",price:"₹2,499",badge:"Bestseller",image:"https://medias.utsavfashion.com/media/catalog/product/cache/1/small_image/295x/040ec09b1e35df139433887a97daa66f/b/a/bandhej-printed-art-silk-anarkali-suit-in-purple-v1-krd2229.jpg"},
 {id:6,category:"clothing",subcategory: "western",name:"Elegant Party Wear",price:"₹1,149",badge:"Daily Wear",image:"https://wyshlist.io/cdn/shop/files/l-k-dress-black-04-traquila-original-imah3z5ehtwzysxh.jpg?v=1733396767&width=1100"},
 {id:7,category:"skincare",subcategory: "personal",name:"Rose Glow Face Cream",price:"₹599",badge:"Glow",image:"https://images.unsplash.com/photo-1612817288484-6f916006741a?auto=format&fit=crop&w=900&q=80"},
 {id:8,category:"skincare",subcategory: "lounge",name:"Herbal Body Care Set",price:"₹799",badge:"Natural",image:"https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=900&q=80"},
 {id:9,category:"skincare",subcategory: "personal",name:"Gentle Face Cleanser",price:"₹449",badge:"Daily Care",image:"https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=80"},
  {id:47,category:"skincare",subcategory: "personal",name:"Gentle Rice TOner",price:"₹449",badge:"Daily Care",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaiTwXZQ3zFBi4TbQeg6dg5NUeEr7vDEWfIZW_2OQwKA&s=10"},
 {id:10,category:"materials",subcategory: "ethnic",name:"Banarasi Inspired Fabric",price:"₹1,299",badge:"Premium",image:"https://cdn.shopify.com/s/files/1/0560/2227/0115/files/banarasi-3.jpg?v=1779110994"},
 {id:11,category:"materials",subcategory: "personal",name:"Printed Cotton Material",price:"₹799",badge:"Fresh",image:"https://content.jdmagicbox.com/quickquotes/images_main/striped-cotton-jaipuri-dress-material-size-xl-801493321-hpeo3abo.jpg?impolicy=queryparam&im=Resize=(360,360),aspect=fit"},
 {id:12,category:"materials",subcategory: "ethnic",name:"Festive Embroidered Material",price:"₹1,599",badge:"Special",image:"https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80"},
  {id:17,category:"clothing",subcategory: "lounge",name:"Blue & White Round Neck Floral Print",price:"₹899",badge:"Popular",image:"https://www.sanskrutihomes.in/cdn/shop/files/IMGL7971.jpg?v=1785409489"},
 {id:18,category:"clothing",subcategory: "lounge",name:"Luxury Loungewear",price:"₹499",badge:"Essentials",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdfMkJ2M1vKPdiAe-R-TBaXb17_ZAcQ_s0BO0MIHNU8g&s=10"},
 {id:19,category:"clothing",subcategory: "personal",name:"Pack of 3 Women Nighty with Robe",price:"₹799",badge:"Essentials",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZNj_eSqAUzy3nb--Qv6cWk57ZNQFpb-iSU9qT8V2_6g&s=10"},
 {id:20,category:"clothing",subcategory: "personal",name:"Women Nighties",price:"₹499",badge:"Essentials",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfCo2Ofs5TX_AoPrxEyYR8x4yVi9I-qw0nriBXVOuBWA&s=10"},
 {id:21,category:"clothing",subcategory: "personal",name:"Sugarbow Shorts Set",price:"₹499",badge:"Essentials",image:"https://www.napstory.in/cdn/shop/files/NAP14441_1.webp?v=1764591268"},
 {id:22,category:"clothing",subcategory: "personal",name:"Comfort Cotton Night Dress",price:"₹499",badge:"Essentials",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfGmk4WbxguPyBluyITNRFnw4Ka-0XjQZNfG_nIrnCi1kAm14u6IAU06Y&s=10"},
  {id:16,category:"clothing",subcategory: "western",name:"Stylish Brown A-Line Western Dress",price:"₹999",badge:"Comfort",image:"https://assets.myntassets.com/w_412,q_50,,dpr_3,fl_progressive,f_webp/assets/images/2026/MARCH/20/EvYhBD6u_0a8f2682b3fd4eeeb0c220ad0aaca648.jpg"},
{
  id: 23,
  category: "womenProducts",
  subcategory: "Footwear",
  name: "Women's Comfort Sandals",
  price: "₹799",
  badge: "New",
  image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQ2RYUxP1lPaGZuUuKSLpA4r59ui5MRE3qTpG9ghYA7VjSmKp9GexAob_bQEPolcxrdCuGrl8MEIp7kMkki70O1xashD2nQmbgGuSgW4PY-BQX8op1oCoPk9Q&usqp=CAc"
},


{
  id: 24,
  category: "womenProducts",
  subcategory: "Beauty",
  name: "Rose Glow Face Cream",
  price: "₹599",
  badge: "Popular",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrjJbbPWT1_1cL-sCWlqkwpvFxhjehiX_DVww9J0Nr5g&s=10"
},

{
  id: 38,
  category: "womenProducts",
  subcategory: "Accessories",
  name: "Beige formal Handbag",
  price: "₹2,299",
  badge: "New",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyvQ7gPJo5iy9cpdLQD8JHr6hAO6ekA77-fD-ls4-mjA&s=10"
},
{
  id: 32,
  category: "womenProducts",
  subcategory: "Beauty",
  name: "sunscreen SPF 50",
  price: "₹599",
  badge: "Popular",
  image: "https://d2p5rd30inmhrb.cloudfront.net/m2/media/catalog/product/d/e/de_tan_sunscreen_1_.jpg"
},{
  id: 33,
  category: "womenProducts",
  subcategory: "Beauty",
  name: "Body Moisturizer",
  price: "₹599",
  badge: "Popular",
  image: "https://cdn.fynd.com/v2/falling-surf-7c8bb8/fyprod/wrkr/products/pictures/item/free/original/000000000494625540/7YpVQs_vJuO-000000000494625540_1.jpg"
},
{
  id: 34,
  category: "womenProducts",
  subcategory: "Beauty",
  name: "Body lotion",
  price: "₹599",
  badge: "Popular",
  image: "https://nakerybeauty.com/cdn/shop/files/EndlessBronze_-_Rapid_Tan_-_250ml_white_shadow.webp?v=1786627490&width=750"
},

{
  id: 31,
  category: "womenProducts",
  subcategory: "Footwear",
  name: "Walking shoes for women",
  price: "₹799",
  badge: "New",
  image: "https://annachy-prod-assets.annachy.com/pims/products-v1/0286885PURWHI2_2-image1_v1776252505081.webp",
},
{
  id: 26,
  category: "womenProducts",
  subcategory: "Accessories",
  name: "Classic Women's Handbag",
  price: "₹3,299",
  badge: "New",
  image: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcS5x5WWzBeA32Vxs92sY-FzB4JxxWgIUVsi8fC28DbZq8N566DGy7CFBjZWuH7wP6PQ8KwZGhlAFCbOgeevEBL3W-8xyrELJnfFrS5nmh3B134p6jWcdntl&usqp=CAc"
},
{
  id: 29,
  category: "womenProducts",
  subcategory: "Footwear",
  name: "Pearls Design sandals",
  price: "₹799",
  badge: "New",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT88TurGP6DT7jaSknkF72viUvLNnH7iY8dg5tbq2K_kw&s=10"
},{
  id: 30,
  category: "womenProducts",
  subcategory: "Footwear",
  name: "Black Flat Sandals",
  price: "₹799",
  badge: "New",
  image: "https://assets.sheinindia.in/medias/shein_sys_master/root1/20260818/YSVO/6a83fec2a0359b385afea0de/-473Wx593H-443344751-black-MODEL.jpg"
},
{
  id: 39,
  category: "womenProducts",
  subcategory: "Accessories",
  name: "lUXURY Women's Handbag",
  price: "₹12,299",
  badge: "New",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLTlgNcYFsM2DKOmXlhkiXo09olv6SSIP4-baQpZUZIw&s"
},
{
  id: 40,
  category: "womenProducts",
  subcategory: "Accessories",
  name: "Classic Women's Handbag",
  price: "₹1,299",
  badge: "New",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOEl9gU8h2OWvCDyyl3tIQtvLltgnzcTXUXrQlskZwYw&s"
},

{
  id: 27,
  category: "womenProducts",
  subcategory: "Beauty",
  name: "Everyday Makeup Kit",
  price: "₹999",
  badge: "Popular",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqMg1QnGGpc8lKETZ5Kmf5NM1zJIy_YEClawmFFtU-_w&s=10"
},
{
  id: 41,
  category: "womenProducts",
  subcategory: "Beauty",
  name: "Lipstick, Lipgloss & Lip liner",
  price: "₹999",
  badge: "Popular",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLQsiDIs5elrwRYVHBQaQfC6D0e4d-ZrNvHpzjE2SGjw&s=10"
},{
  id: 42,
  category: "womenProducts",
  subcategory: "Beauty",
  name: "Makeup Kit Gift Box",
  price: "₹999",
  badge: "Popular",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8x8y-hMzRlOvIJXtzCfeXcU3I1R_DsUc4y-MctvKXjQ&s=10"
},{
  id: 43,
  category: "womenProducts",
  subcategory: "Beauty",
  name: "Makeup Essentials Kit",
  price: "₹999",
  badge: "Popular",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoxA1-liibLx3SX-4KvNGdlLKHVZDzrnuXB6EpDOnpBA&s=10"
},


{id:48,category:"innerwear",subcategory:"bra",name:"Comfortable Everyday Bra",price:"₹699",badge:"Comfort",image:"https://m.media-amazon.com/images/I/31bweCm6QNL._AC_UY1100_.jpg"},
{id:49,category:"innerwear",subcategory:"panties",name:"Soft Cotton Panty",price:"₹299",badge:"Soft Fabric",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXcyeiFH-6VNVkqzjDz4uUjEFFild__KQjCtwPFqQt995HYgVArrfaAaTV&s=10"},
// {id:50,category:"innerwear",subcategory:"bra",name:"Spaghetti Strap Camisole",price:"₹399",badge:"Breathable",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStcfk-6nXi6Z4sC5Fh7Q4_bajFgaA6J55QlDan35ndfQ&s=10"},
{id:51,category:"innerwear",subcategory:"bra",name:"Comfort Fit Slip",price:"₹449",badge:"Lightweight",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq1hYiydTmKHAtLmG-vXvMfCWlk1AaNdfLl8rlMQwHxw&s"},
{
  id: 53,
  category: "clothing",
  subcategory: "sarees",
  name: "Elegant Banarasi Silk Saree",
  price: "₹2,499",
  mrp: "₹4,999",
  offer: "50% OFF",
  badge: "Bestseller",
  image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=900&q=80"
},
{
  id: 54,
  category: "clothing",
  subcategory: "sarees",
  name: "Soft Cotton Handloom Saree",
  price: "₹1,299",
  mrp: "₹2,499",
  offer: "48% OFF",
  badge: "Popular",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKCCtMwrozYzQA3NINHeGQWsTIlBW9KMjShPecADXqJA&s=10"
},
{
  id: 55,
  category: "clothing",
  subcategory: "sarees",
  name: "Festive Kanjivaram Silk Saree",
  price: "₹3,499",
  mrp: "₹6,999",
  offer: "50% OFF",
  badge: "Premium",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQglrlD0W7njichBeoXag8-j2_zxxjRCVK3BliDG7pdw&s=10"
},
{
  id: 56,
  category: "clothing",
  subcategory: "sarees",
  name: "Printed Floral Georgette Saree",
  price: "₹999",
  mrp: "₹1,999",
  offer: "50% OFF",
  badge: "New",
  image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=900&q=80"
},
{
  id: 57,
  category: "clothing",
  subcategory: "sarees",
  name: "Chiffon Party Wear Saree",
  price: "₹1,499",
  mrp: "₹2,999",
  offer: "50% OFF",
  badge: "Trending",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9XKc0KM_2WYZsO9dlDNgMnSUDhRCwuObS3l-SUYJU_g&s=10"
},
{
  id: 58,
  category: "clothing",
  subcategory: "sarees",
  name: "Designer Organza Saree",
  price: "₹1,899",
  mrp: "₹3,499",
  offer: "46% OFF",
  badge: "New",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRASrySTQ57ajIGcFtRzzVirU116OqQ82stGcfLYH0ExA&s=10"
},
{
  id: 59,
  category: "clothing",
  subcategory: "sarees",
  name: "Embroidered Party Wear Saree",
  price: "₹2,199",
  mrp: "₹4,299",
  offer: "49% OFF",
  badge: "Bestseller",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvqht9ilSJsbLiO9Y_blh8ykvaR0wCntETsgrgTAzo0g&s=10"
},
{
  id: 60,
  category: "clothing",
  subcategory: "sarees",
  name: "Lightweight Daily Wear Saree",
  price: "₹799",
  mrp: "₹1,499",
  offer: "47% OFF",
  badge: "Essentials",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHEq6V68tOG7cDyjQ-rMrhSuAE5535fbo5xMN1arwj8g&s=10"
},
{id:61,category:"clothing",subcategory:"kids",name:"Pink Floral A-Line Girls Dress",price:"₹799",badge:"New",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhAo4YH_7AZS-MuywKr0JjTye2O196y7knAvZB1u-54w&s=10"},

{id:62,category:"clothing",subcategory:"kids",name:"Lavender Party Wear Frock",price:"₹999",badge:"Party Wear",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHK1KALEV3x9m9rsXtSeVCZbUmN1ZUWaRSebRY4bXLYg&s=10"},

{id:63,category:"clothing",subcategory:"kids",name:"Floral Fit & Flare Girls Dress",price:"₹699",badge:"Trending",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1iJM6b2vS-No5jLMBVIj4YKodT9JtOAJa3ydmq6KwyA&s=10"},

{id:64,category:"clothing",subcategory:"kids",name:"Bow Design Girls Party Dress",price:"₹899",badge:"Best Seller",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgkjiv_vHmGzDh2XAyA-HtgCq62iEDc-9kc2dbOhFTVA&s=10"},

{id:65,category:"clothing",subcategory:"kids",name:"Floral Cotton Summer Dress",price:"₹599",badge:"Comfort",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS378nUvYu7TtZTynctlqfpqPJdzm3364-v2Z0kF3UH8w&s=10"},

{id:66,category:"clothing",subcategory:"kids",name:"Princess Layered Party Frock",price:"₹1299",badge:"Premium",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJDmy97oFbu0vX7WFFreKrZWnkxZGIRVXiodEiuldraw&s=10"},

{id:67,category:"clothing",subcategory:"kids",name:"Peach Ruffle Sleeve Girls Dress",price:"₹749",badge:"New",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2wi5Fme1OBLmdfI1fUfCzAiHY1vdyKgy7Td2eTKMreA&s=10"},

{id:68,category:"clothing",subcategory:"kids",name:"Denim Style Shirt Dress",price:"₹899",badge:"Casual",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-PmHIMicT1aOvQbj85RrvK1I7N-NVXvGjFgPsfwfFaw&s=10"},

{id:69,category:"clothing",subcategory:"kids",name:"Rainbow Printed Western Dress",price:"₹699",badge:"Trending",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpaDF4vfrxQH-NRFYWt_3vA7ydJIQh6e4k2TMsf0tPiw&s"},

{id:70,category:"clothing",subcategory:"kids",name:"Elegant Girls Maxi Dress",price:"₹1199",badge:"Premium",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWzNcxP1Ah3mLdgsehDZKSSvfP13gPKclU9NPOvCILJA&s=10"},




{
  id: 77,
  category: "womenProducts",
  subcategory: "Watches",
  name: "Elegant Rose Gold Women Watch",
  price: "₹899",
  badge: "Bestseller",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ82N_VU_9Ncf3r2ZsMA_HAhbu4Qpv_3KfOV8frh3X6Xg&s"
},

{
  id: 78,
  category: "womenProducts",
  subcategory: "Watches",
  name: "Classic Silver Dial Women Watch",
  price: "₹799",
  badge: "New",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkKJ-FT-Bdj5Vc6B5WGTc3JJYyJksYmefHg26rhkImAw&s=10"
},

{
  id: 79,
  category: "womenProducts",
  subcategory: "Watches",
  name: "Luxury Black Dial Women Watch",
  price: "₹999",
  badge: "Trending",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgaBahOuJT52Z6kXzE1h7VPuqplMNaAErWRUhRw2CtoQ&s=10"
},

{
  id: 80,
  category: "womenProducts",
  subcategory: "Watches",
  name: "Minimalist Gold Strap Women Watch",
  price: "₹699",
  badge: "Popular",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRD8KgomnF08gQy1-TxXpUI9qErLuRo0Gy788W8vXstcw&s=10"
},

{
  id: 81,
  category: "womenProducts",
  subcategory: "Watches",
  name: "Stylish Pink Dial Ladies Watch",
  price: "₹849",
  badge: "New",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIHc1eUUSxK5Vbn0O-eaxzA2SQDNFWNIwns_dqEKkTrQ&s=10L"
},

{
  id: 82,
  category: "womenProducts",
  subcategory: "Watches",
  name: "Classic Leather Strap Women Watch",
  price: "₹749",
  badge: "Comfort",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrVtJasAJGyzGQIPKUVBYEzkm8WDjLfUkg4j5AfC6knQ&s=10"
},





{id:91,category:"clothing",subcategory:"ethnic",name:"Floral Anarkali Kurta With Dupatta",price:"₹2,699",badge:"Bestseller",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8-42xoqJHvqJYEzqVEBMbV4asaZzixu-WZ9Mkk2dIJg&s=10"},

{id:92,category:"clothing",subcategory:"ethnic",name:"Embroidered Straight Kurta Set",price:"₹2,499",badge:"Popular",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1SitiKBKmhjfi8rVIQfZA0L_4ENRz9DkjZ1VdxE8oAw&s=10"},

{id:93,category:"clothing",subcategory:"ethnic",name:"Festive Sharara Kurta With Dupatta",price:"₹3,299",badge:"Festive",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5drJuEZUl8fhflf8hLKAJMlWd6--KO3vtza5FlZG-zQ&s=10"},

{id:94,category:"clothing",subcategory:"ethnic",name:"Printed A-Line Kurta Set",price:"₹1,899",badge:"Everyday",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSum01RCTcFaVHQr0EKqKlzGereJIimzD0Wy87UnZpnFg&s=10"},

{id:95,category:"clothing",subcategory:"ethnic",name:"Bandhani Lehenga Choli Set",price:"₹4,499",badge:"Wedding",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4CFTRIkqRjkPhSUQr620H58Q0Sr3CER5-PdCYFl3s8w&s=10"},

{id:96,category:"clothing",subcategory:"ethnic",name:"Mirror Work Anarkali Dress",price:"₹3,499",badge:"Trending",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgnDjfl7AYINRXDHEgLpUBbONkIvrFRdlPB8U92ni9AQ&s=10"},

{id:97,category:"clothing",subcategory:"ethnic",name:"Asymmetric Kurta With Cigarette Pants",price:"₹2,799",badge:"New",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgtvyhyJswyPYcTvQ6DuIA6Oj9qM0E9TEriY1gPYbRRA&s=10"},

{id:98,category:"clothing",subcategory:"ethnic",name:"Cape Top With Ethnic Palazzo",price:"₹2,599",badge:"Chic",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxyrrGcadH0Fy-PEqLeIBG7tAORSmgnShAOFaTDdE2IA&s=10"},

{id:99,category:"clothing",subcategory:"ethnic",name:"Embroidered Jacket With Maxi Dress",price:"₹3,199",badge:"Designer",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBXT6SfUgaxGh6so8XZ-c8kFnvpvlmbnZr_9byMs42Rw&s=10"},

{id:100,category:"clothing",subcategory:"ethnic",name:"Draped Kurta With Wide Leg Pants",price:"₹2,999",badge:"Modern",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs4UNNs7ggXc6Cui0SaRL46YwhPVp_5ecCufcAxEZ8cg&s=10"},

{id:101,category:"clothing",subcategory:"ethnic",name:"Peplum Kurti With Flared Skirt",price:"₹2,399",badge:"Trending",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlm0IjuwJ9sgTeVz9RtI_QZUSxcxFxMFYVtyLWDdv-EQ&s=10"},

{id:102,category:"clothing",subcategory:"ethnic",name:"Long Ethnic Shrug With Jumpsuit",price:"₹3,499",badge:"Statement",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6oG_OPjbk3ajcQKFERPv6ZwnL3Si3kCQh8n0HbuHNdg&s=10"},

{id:103,category:"clothing",subcategory:"sarees",name:"Pre-Draped Saree With Belt",price:"₹3,299",badge:"Modern",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrQ-ORehm3a-Lv62knBGTqoTXNmYS0E3TiXE7F9ZCl6A&s"},

{id:104,category:"clothing",subcategory:"sarees",name:"Saree With Ruffled Blouse",price:"₹3,799",badge:"Party Wear",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrehKBLshJZexfqyuBsTxIbW101TitbqxG2olOKNuJ3Q&s=10"},

{id:105,category:"clothing",subcategory:"ethnic",name:"Lehenga With Shirt Style Blouse",price:"₹3,999",badge:"Fusion",image:"https://img2.ogaanindia.com/pub/media/catalog/product/cache/3f6619daccdb194398d06464ab49fa6e/h/k/hksaara1.jpg"},

{id:106,category:"clothing",subcategory:"ethnic",name:"Dhoti Pants With Peplum Top",price:"₹2,699",badge:"Fusion",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThkcurXNfHPilz1xclfcpM8VWBngBLfsptxnv01ckysA&s=10"},

{id:107,category:"clothing",subcategory:"sarees",name:"Saree Gown With Embellished Waist Belt",price:"₹4,299",badge:"Premium",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRktZk_JLVr1amK7LoARNVij46nI3SUwD6Wm4GlJwkmXQ&s=10"},

{id:108,category:"clothing",subcategory:"ethnic",name:"Kurta Dress With Denim Jacket",price:"₹2,499",badge:"Casual Fusion",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRz82NrobTJUVUvcSJ67FDD96n8M7O3C4Kt0GfJ4IKSTw&s=10"},

{id:109,category:"clothing",subcategory:"ethnic",name:"Anarkali Gown With Statement Dupatta",price:"₹3,699",badge:"Elegant",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfiYwGLJBouyDKnP91IV7czdCk0WzBFfv2p2YdhK4Gng&s"},
{id:111,category:"clothing",subcategory:"western",name:"Classic High Waist Straight Jeans",price:"₹1,299",badge:"Bestseller",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9G3VqaxCHoXWdp3i64A53nQD5w3taB-b95o4ipBsyDg&s"},

{id:112,category:"clothing",subcategory:"western",name:"Relaxed Fit Wide Leg Jeans",price:"₹1,499",badge:"Trending",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtKKKv2w0hTqVZmUrZ8LjPUvm5_MMHK7JCA1_6Cu9JGg&s=10"},

{id:113,category:"clothing",subcategory:"western",name:"Oversized Casual T-Shirt",price:"₹599",badge:"Popular",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8S__7hg664P3cRVdYVSG5mvjoaccBzTYIeHd0yBKwkA&s=10"},

{id:114,category:"clothing",subcategory:"western",name:"Ribbed Fitted Crop Top",price:"₹499",badge:"New",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR0b_fdJ_s240EhEUvtcfF2_AtiQ-va3NrJuei4oNwbw&s=10"},

{id:115,category:"clothing",subcategory:"western",name:"Casual Printed T-Shirt",price:"₹549",badge:"Everyday",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNFguMuawdmepoC0rg8-nXqFu-tWLcdhBzLeW6Dq6Kow&s=10"},

{id:116,category:"clothing",subcategory:"western",name:"Oversized Cotton Shirt",price:"₹899",badge:"Trending",image:"https://desisandook.in/cdn/shop/files/IMG_9958_jpg.jpg?v=1785243252&width=1080"},

{id:117,category:"clothing",subcategory:"western",name:"Classic Formal Shirt",price:"₹999",badge:"Office Wear",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOfa5TgAqpFb9f8pR8JS1y2NY8XTRjCcSi-oICSxj6zA&s=10"},

{id:118,category:"clothing",subcategory:"western",name:"High Waist Straight Trousers",price:"₹1,199",badge:"Workwear",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSR3P-OvFLcB0EG7gMUc5LWwJx3Yf4DdPsLqgP8dGqhoA&s=10"},

{id:119,category:"clothing",subcategory:"western",name:"Wide Leg Formal Pants",price:"₹1,299",badge:"Office Wear",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc9t0J9ZCYw35ItilVlU-qQvWN_lDasSiTn-4SKTksFg&s=10"},

{id:120,category:"clothing",subcategory:"western",name:"A-Line Midi Skirt",price:"₹999",badge:"Chic",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6kcFdAbgzZQfW4azWs15GqqxLhVgFf3fR2HMl1CNK2w&s=10"},

{id:121,category:"clothing",subcategory:"western",name:"Pleated Midi Skirt",price:"₹1,099",badge:"Popular",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_doZS8uIwAWaXDK-YK8zf5AqyphZ8g5oU2i5XZEIABQ&s=10"},

{id:122,category:"clothing",subcategory:"western",name:"Floral Wrap Midi Dress",price:"₹1,499",badge:"Bestseller",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuqEi5os9LcEMUTDkQAjJoxqXYhlwDHxp-H_SC7kvuQg&s"},

{id:123,category:"clothing",subcategory:"western",name:"Casual Shirt Dress",price:"₹1,399",badge:"Everyday",image:"https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&w=900&q=80"},

{id:124,category:"clothing",subcategory:"western",name:"Elegant Maxi Western Dress",price:"₹1,799",badge:"Trending",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9gpyLzygMY2BDVaq7jVO2bz4eHkxR-oqo5WkzExz2Dw&s=10"},

{id:125,category:"clothing",subcategory:"western",name:"Sleeveless Summer Dress",price:"₹999",badge:"Summer",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4Zcqg_Zq-SoPG-8tTKNLcVAc2B8h0H1CJ87BUEWOMJw&s=10"},


{id:126,category:"clothing",subcategory:"sarees",name:"Kanjivaram Silk Saree",price:"₹4,499",badge:"Premium",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6CkjVGwd4LoPlSCAirT5N0wZ2gHBqh2RJ5VRGhISjRQ&s=10"},

{id:127,category:"clothing",subcategory:"sarees",name:"Soft Cotton Handloom Saree",price:"₹1,299",badge:"Popular",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvbbABD4Hk2trQqTzLkZp1dOnSVDNvj1YztEvXMsdVIQ&s=10"},

{id:128,category:"clothing",subcategory:"sarees",name:"Chanderi Silk Saree",price:"₹2,499",badge:"Elegant",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRO0H3c8l1a0KWkE-WhKFyoImjm4AI95eAuQnxgkP0LXg&s=10"},

{id:129,category:"clothing",subcategory:"sarees",name:"Paithani Silk Saree",price:"₹3,999",badge:"Traditional",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXkmxcLh_d_21IyFHABvC2whUdzwLW8tphyQKuPUW0vQ&s=10"},

{id:130,category:"clothing",subcategory:"sarees",name:"Bandhani Printed Saree",price:"₹1,499",badge:"Trending",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUKqyzZ5uq2LAIGiTqkkkj_olF_KuoroWBEQyX1-zIeA&s=10"},

{id:131,category:"clothing",subcategory:"sarees",name:"Pochampally Ikat Saree",price:"₹1,899",badge:"Handloom",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa49RRUfn57G45yTTWXnEtFt-H80Dwr8CZ50iCHqpT-A&s=10"},

{id:132,category:"clothing",subcategory:"sarees",name:"Kalamkari Printed Saree",price:"₹1,299",badge:"Artisan",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyPkIZyWlhNNHNGvkTiULl5QjKdZqKzSCh3xW4D4QOdQ&s=10"},

{id:133,category:"clothing",subcategory:"sarees",name:"Mysore Silk Saree",price:"₹2,799",badge:"Classic",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcO3Cwl3WtaRiYsNkQSN6RUZgoZ8R9isq-r9E1GM0j7A&s=10"},

{id:134,category:"clothing",subcategory:"sarees",name:"Handloom Saree",price:"₹1,999",badge:"Handloom",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH-OxemuIU4M6TeTeM9dV2OxRDk-Ykb2M0007P4cACgw&s=10"},

{id:135,category:"clothing",subcategory:"sarees",name:"Tussar Silk Saree",price:"₹2,499",badge:"Premium",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl5oJf-oJmJFnpWGPane6vesFX7f9JqKNiJ5tX8WFV_w&s=10"},

{id:136,category:"clothing",subcategory:"sarees",name:"Organza Silk Saree",price:"₹2,199",badge:"New",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfYzzkPwcX0_YmHvs35BycV9H62WWRGhvBn2UFKnieEg&s"},

{id:137,category:"clothing",subcategory:"sarees",name:"Georgette Party Wear Saree",price:"₹1,799",badge:"Party Wear",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt7AaEovdqkootOZC5Yxi6NPZknp66EKmcixc6XONH8w&s=10"},

{id:138,category:"clothing",subcategory:"sarees",name:"Chiffon Floral Saree",price:"₹1,399",badge:"Popular",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsiOu2o7dzIoAfD74fjuDH_wuYaQCG0QcYqFmk3ze5gw&s=10"},
{id:149,category:"innerwear",subcategory:"bra",name:"Wireless Everyday Bra",price:"₹699",badge:"Comfort",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgGsmHZxmU8OzqFsCPHyy-fEImtA5dSm1fPxA4zDXDVQ&s=10"},

{id:150,category:"innerwear",subcategory:"bra",name:"Seamless T-Shirt Bra",price:"₹799",badge:"Seamless",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR14sGR_u59FIMSWMAQUzC2UtIlWOKMQfPNU8TEVXj5AQ&s=10"},

{id:151,category:"innerwear",subcategory:"bra",name:"Lightly Padded Bra",price:"₹749",badge:"Popular",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdbr_uhsYx8uV3V9OAgeEgsk2qyARq6M28ewiP7k114A&s=10"},

{id:152,category:"innerwear",subcategory:"bra",name:"Push-Up Bra",price:"₹899",badge:"Modern",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcROi91XFiYxssVy47ND36G4bTKqNjcddzeD9KffUA53zA&s=10"},

{id:153,category:"innerwear",subcategory:"bra",name:"Full Coverage Cotton Bra",price:"₹599",badge:"Everyday",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeV34YH9TBhZrgLLKYpTnslXhGOvR9gjiGs2yOcOMpRg&s=10"},

{id:154,category:"innerwear",subcategory:"bra",name:"Plunge Neck Bra",price:"₹899",badge:"Trendy",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQalSBZAFOSpm1-9qiy9WYm63mF2paBZwz9n7DakMBs8g&s"},

{id:155,category:"innerwear",subcategory:"bra",name:"Balconette Bra",price:"₹999",badge:"Elegant",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQk-5Q0XLAGICentHUfsNhWYYKKt6O2eVoec_9uLTJFoA&s=10"},

{id:156,category:"innerwear",subcategory:"bra",name:"Multiway Convertible Bra",price:"₹899",badge:"Versatile",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTz61_VsgBFuXAWNhSvjZOKUV4lbVaYAjdlHKM7JgoruA&s"},

{id:157,category:"innerwear",subcategory:"bra",name:"Sports Bra",price:"₹699",badge:"Activewear",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFi5HL5MdDN9kUg5gWm92xfh2GG1NntoaRlkhsIEcqYQ&s=10"},

{id:158,category:"innerwear",subcategory:"bra",name:"High Impact Sports Bra",price:"₹899",badge:"Performance",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1Sf3oT5unJ6dL8Xmx13A0fPtBR9xty2Vh_2EkfJVhNQ&s=10"},

{id:159,category:"innerwear",subcategory:"bra",name:"Cotton Bralette",price:"₹499",badge:"Comfort",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZBe9Dkal-MedPXiJPqglE_my5UgbbyDMjhb90kfMzdQ&s=10"},

{id:160,category:"innerwear",subcategory:"bra",name:"Lace Bralette",price:"₹699",badge:"Trendy",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJeBX7Bks7mB5DM93XewymIUexVIgSb_FnZraLb33MRw&s=10"},

{id:161,category:"innerwear",subcategory:"bra",name:"Longline Bralette",price:"₹799",badge:"Modern",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHxTJGItDscKxDzJXUaAbbPc2aul1MV9xydxeXMNJCRQ&s"},

{id:162,category:"innerwear",subcategory:"bra",name:"Camisole Bra",price:"₹599",badge:"Everyday",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDoGs1L9oxumxXCBj_IYhd1Ni9Hm0TUt2rlO9I4moqGg&s=10"},

{id:163,category:"innerwear",subcategory:"camisoles",name:"Seamless Camisole",price:"₹449",badge:"Seamless",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrsjRu5mvPqcimJCZwfTiDADg14ph60GXtJheCteuZWw&s=10"},

{id:164,category:"innerwear",subcategory:"camisoles",name:"Adjustable Strap Camisole",price:"₹399",badge:"Daily Wear",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfgwSbJ8TuEClZrohD2W6nuy36vm7W9MXgkVV9SaKNdA&s=10"},

{id:165,category:"innerwear",subcategory:"camisoles",name:"Padded Camisole",price:"₹599",badge:"Modern",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS37l-EUB1pZxhk6l5tC2RxOlRTYWsuvpqQN4jqJEUL7w&s=10"},

{id:166,category:"innerwear",subcategory:"camisoles",name:"Cotton Inner Slip",price:"₹499",badge:"Comfort",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHjUYJfOfXTfO3zb8yDFplyiwS_3-ATuSF-puzmV6ljA&s=10"},

{id:167,category:"innerwear",subcategory:"camisoles",name:"Full Length Inner Slip",price:"₹549",badge:"Everyday",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUniS6tnC1AX3du3JLd1cHacFWHMH5PagoHCws7jfSSA&s=10"},

{id:168,category:"innerwear",subcategory:"camisoles",name:"Spaghetti Strap Slip",price:"₹399",badge:"Lightweight",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiFKE7HZlTkY7QYphuNLRdOiFlmHWAgcIPCk_QvQMvtg&s=10"},

{id:169,category:"clothing",subcategory:"personal",name:"Cotton Shorts & Camisole Set",price:"₹549",badge:"Comfort",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRShRJc2vkU5q3gY809j5cvlVQomkTB_jI49278jdL4Kw&s=10"},

{id:170,category:"clothing",subcategory:"personal",name:"Printed Shorts & T-Shirt Night Set",price:"₹599",badge:"Casual",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXKcFH7WiB3MWg42k9RufTR1I8PVLbclqancwCkOVnqg&s=10"},

{id:171,category:"clothing",subcategory:"personal",name:"Satin Shorts & Shirt Set",price:"₹899",badge:"Premium",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSENxNAvM1sB0H2pVmIL1LvLz54C5dCrMsa2e7MoyWMUg&s=10"},

{id:172,category:"clothing",subcategory:"personal",name:"Lace Trim Camisole & Shorts Set",price:"₹799",badge:"Trendy",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7bIHjOI5FTEtBB1USx2TjgUGhVGCQbdk6iQ4w3FMYww&s=10"},

{id:173,category:"clothing",subcategory:"personal",name:"Cotton Top & Capri Night Suit",price:"₹699",badge:"Everyday",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQu0dNDUgb8s_PqYFj7sR2WaVZ6DYaA_RzOoQLFlTyU3g&s=10"},

{id:174,category:"clothing",subcategory:"personal",name:"Printed Kurti & Pyjama Night Set",price:"₹799",badge:"Indo Modern",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyDtGA3urn9dqTtUC79GgRGdW7cXfKS0lRyTMpHHAu0A&s=10"},

{id:175,category:"clothing",subcategory:"personal",name:"Short Kurti & Palazzo Lounge Set",price:"₹849",badge:"Fusion",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRqmKjNHxHeo-69iEFAg1f1i7V-EVDiLapIsPYVlySBw&s"},

{id:176,category:"clothing",subcategory:"personal",name:"Kaftan Style Short Night Dress",price:"₹699",badge:"Relaxed",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREHpWrlahk7qA6I4jXgaRBExWqgquqEdOoqUkLDW-GUw&s"},

{id:177,category:"clothing",subcategory:"personal",name:"Floral Wrap Night Robe",price:"₹799",badge:"Elegant",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTb-rmPeN2ODLzs8B5IhhlRNBHut9PZkwugUphML0Sy2w&s"},

{id:178,category:"clothing",subcategory:"personal",name:"Satin Robe With Inner Camisole",price:"₹999",badge:"Luxury",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSqjtgIzEzNhejZIM7V3jiIZ9WhkrA1DaasJUbrFEjeg&s=10"},

{id:179,category:"clothing",subcategory:"personal",name:"Oversized Sleep T-Shirt",price:"₹449",badge:"Relaxed",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTygzLoEMkvBFCLuBy2w_W9BI550vHOnty7Er-JFi8LUA&s=10"},

{id:180,category:"clothing",subcategory:"personal",name:"Cotton Jogger & Crop Top Night Set",price:"₹799",badge:"Modern",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTlKN7-PoCLucYz4O20PA8kE1W7-FC39xwKpXd4B6MD-A&s=10"},

{id:181,category:"clothing",subcategory:"personal",name:"Loose Fit Pyjama & Tank Top Set",price:"₹649",badge:"Comfort",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpG4GOub0vkWrVf8vPZFdNoSzl_QgKQ3Z4xeiqhNlTXQ&s"},

{id:182,category:"clothing",subcategory:"personal",name:"Ethnic Print Kaftan Nightie",price:"₹899",badge:"Indo Modern",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBqMEkZozb_WOPBaqtsI4nB0_SzhY8xvgAPZaHFPynrg&s=10"},

{id:183,category:"clothing",subcategory:"personal",name:"Embroidered Cotton Nightie ",price:"₹849",badge:"Elegant",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP4wHS4VMPA5AmnLUtDDcqEXCCbQrHDprySqOhlN5cdQ&s"},

{id:184,category:"clothing",subcategory:"personal",name:"Three Piece Nightwear Set With Robe",price:"₹1,099",badge:"Premium",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpKSQrPp4duy8qZzdqKQ5Ahp4iZwrDF8VElAD_iI52dQ&s=10"},
{id:186,category:"clothing",subcategory:"kids",name:"Girls Denim Shorts",price:"₹599",badge:"Casual",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqNjAaU9tqaCnDq3eynlRiABqsXLZZs78v-nfN5UlNQw&s=10"},

{id:187,category:"clothing",subcategory:"kids",name:"Girls Cotton Shorts",price:"₹499",badge:"Comfort",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXKWmTIdhmSoh6yQRK7KsOojv0SwyZDy6mTFSPsMZwrg&s"},

{id:188,category:"clothing",subcategory:"kids",name:"Girls Printed Shorts",price:"₹549",badge:"Summer",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQv1QOWOMnET2KQ-UQHsjgQh2FdAiGK4ekO1rnyO-EupQ&s=10"},

{id:189,category:"clothing",subcategory:"kids",name:"Girls Denim Jeans",price:"₹799",badge:"Trending",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTimCsAbnujD29qlbIVN6wF7xZVHHZMdlvlL19NL2BYYg&s=10"},

{id:190,category:"clothing",subcategory:"kids",name:"Girls Straight Fit Jeans",price:"₹849",badge:"Casual",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxeA0tNmbFc6aHIJ2-xWTAiM_RFX8ZLUFauJ_EU18W4Q&s"},

{id:191,category:"clothing",subcategory:"kids",name:"Girls Wide Leg Jeans",price:"₹899",badge:"Modern",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNyX86NZQ6M6HoXS8qLcEcCDIfhA4HJ16iJBbiRc3GRA&s=10"},

{id:192,category:"clothing",subcategory:"kids",name:"Girls Cargo Jeans",price:"₹949",badge:"Trendy",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRmYuhbva4gowEwZ45Hh3Fsiy4afayxNRu_lYe8i3kkxw&s=10"},

{id:193,category:"clothing",subcategory:"kids",name:"Girls Denim Skirt",price:"₹699",badge:"Casual",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2SEmqVIt8ztGmzGlof5xoZOrbCWGN6y_RWlgYTh8LmQ&s=10"},

{id:194,category:"clothing",subcategory:"kids",name:"Girls Pleated Skirt",price:"₹599",badge:"Fashion",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAjzDzhlF4c5cZen76efG7LuMMqN5BN2NEyndBEJp8wQ&s=10"},

{id:195,category:"clothing",subcategory:"kids",name:"Girls Printed Midi Skirt",price:"₹649",badge:"Summer",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXPocoamQeb0nzz0hXvz8jd-HbqoD_RIUeqEQxLhlVVg&s=10"},

{id:196,category:"clothing",subcategory:"kids",name:"Girls Floral Midi Dress",price:"₹799",badge:"Pretty",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5MQas6_rod57F49ESvmpHOoxGhDEAk4zZWieBourfOg&s"},

{id:197,category:"clothing",subcategory:"kids",name:"Girls Casual Midi Dress",price:"₹749",badge:"Everyday",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVq9D_DZXot-MXaSYnXDo-f7F_ZSZsinZQ6WVEdymOZw&s=10"},

{id:198,category:"clothing",subcategory:"kids",name:"Girls Denim Shirt Dress",price:"₹899",badge:"Modern",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR35EbkhqzYCWy19bamzOGhzr8agDmZx4c-Qal1Xp8peg&s=10"},

{id:199,category:"clothing",subcategory:"kids",name:"Girls Printed A-Line Dress",price:"₹699",badge:"Popular",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUBe43JFSdbElzG6fACj0ogNtHHKuWS0lWv96hONOSuw&s"},

{id:200,category:"clothing",subcategory:"kids",name:"Girls Ruffle Sleeve Dress",price:"₹799",badge:"Trendy",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQhdsSlBqYuhPQKyKY--G__7GtKLejp6fxGTCEYigfOA&s=10"},

{id:201,category:"clothing",subcategory:"kids",name:"Girls Crop Top & Jeans Set",price:"₹999",badge:"Modern",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxHir47krPr4bLcaNnEI2JWk-WRximidnsXeIoOSmxHw&s=10"},

{id:202,category:"clothing",subcategory:"kids",name:"Girls T-Shirt & Denim Shorts Set",price:"₹799",badge:"Casual",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXbcvHCquu6EcANFKsZ2uY0UOiTgTvuAgH_HS5y0Z4yA&s=10"},

{id:203,category:"clothing",subcategory:"kids",name:"Girls Top & Pleated Skirt Set",price:"₹899",badge:"Fashion",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6M7rgJdJw7kv6ay3S7mZMxtR7N2V06ZM8Lg7SUGqAMQ&s"},
{id:204,category:"innerwear",subcategory:"panties",name:"Soft Cotton Everyday Panty",price:"₹299",badge:"Comfort",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfe2typaspHJ0KO3q7VGajAuKEQoJg-Gu2_v70LdACag&s"},

{id:205,category:"innerwear",subcategory:"panties",name:"Seamless Hipster Panty",price:"₹349",badge:"Seamless",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRts19Va2Op5761mmW4-u8nq6Pt5q__B_g9ZXsGqke1tw&s=10"},

{id:206,category:"innerwear",subcategory:"panties",name:"High Waist Cotton Panty",price:"₹399",badge:"Everyday",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH1e3lKn46fYhiicLaIpN5S2PuXGNBHHud_Olv5glA9w&s=10"},

{id:207,category:"innerwear",subcategory:"panties",name:"Cotton Bikini Brief Panty",price:"₹299",badge:"Breathable",image:"https://cdn.zivame.com/media/zcmsimages/configimages/LL020320YW-Plain%20Assorted/2_large.jpg"},

{id:208,category:"innerwear",subcategory:"panties",name:"Invisible Seamless Panty",price:"₹449",badge:"No Show",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAUWJSTKyYdtqrypDXoJbHnQJgflsH1sVNHpKtawsWGg&s=10"},

{id:209,category:"innerwear",subcategory:"panties",name:"Soft Stretch Bikini Panty",price:"₹349",badge:"Soft Fabric",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCKvtKf-pNOyBU3d6C7eXHQXggyrOOwVgDxNYl1EbnGw&s=10"},

{id:210,category:"innerwear",subcategory:"panties",name:"Full Coverage Cotton Panty",price:"₹399",badge:"Full Coverage",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtBzEdY0pgRo_fGyEfTeOCh59LlZVQ4iCMwEinmHed3Q&s=10"},

{id:211,category:"innerwear",subcategory:"panties",name:"Low Rise Cotton Brief",price:"₹299",badge:"Daily Wear",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHM9UPI0oEuuhcmkd2dmaf2KlgUJW0TrusIDd8LRhQfA&s=10"},

{id:212,category:"innerwear",subcategory:"panties",name:"High Rise Seamless Brief",price:"₹449",badge:"Seamless",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6br6xXXqxAVmjOt9m9xwwAwJULTWR5folCVGqKy5zQQ&s=10"},

{id:213,category:"innerwear",subcategory:"panties",name:"Cotton Lycra Stretch Panty",price:"₹329",badge:"Stretchable",image:"https://images.meesho.com/images/products/1010409557/r41zy_512.webp?width=512"},

{id:214,category:"innerwear",subcategory:"panties",name:"Printed Cotton Hipster Panty",price:"₹349",badge:"Popular",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbCr8Nsunle3_OT7XTKP7BPDX4HHWoOBVd5fdKKKpHdg&s"},

{id:215,category:"innerwear",subcategory:"panties",name:"Comfort Fit Boyshort Panty",price:"₹399",badge:"Comfort",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvFBig4V1Wau18VM7lKkvp3KBhQE9a5CZD3pESRKjSIA&s"},

{id:216,category:"innerwear",subcategory:"panties",name:"Mid Rise Everyday Panty",price:"₹299",badge:"Everyday",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIPI5N9XzxfHHoKX64CU3yloOgwFvelqnjItW-0eQjYg&s=10"},

{id:217,category:"innerwear",subcategory:"panties",name:"Breathable Cotton Brief",price:"₹349",badge:"Breathable",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWrszVZcOcCi2KokBGyi4acym9pQoeTu7nmim5U_o8gQ&s=10"},

{id:218,category:"innerwear",subcategory:"panties",name:"Seamless Stretch Hipster Panty",price:"₹449",badge:"Trending",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO5WaQ8IUTumkLQCbSNlUcSoPNqTzph06B3MRC2Qy8-Q&s=10"},
{id:219,category:"innerwear",subcategory:"sets",name:"Lace Bra and Panty Lingerie Set",price:"₹899",badge:"Elegant",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfm6iIrA8ysJ6dGUWgBjrWpK5GxaKic4BxuKqcEGOUUw&s=10"},

{id:220,category:"innerwear",subcategory:"sets",name:"Floral Lace Lingerie Set",price:"₹999",badge:"Trending",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStnjPEkoskKXrLpiXlTYtoRDrglSLQVk6thYwa0i9-FA&s=10"},

{id:221,category:"innerwear",subcategory:"sets",name:"Satin Bra and Panty Set",price:"₹1,099",badge:"Premium",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZBwuUu9Czyftw5dE0cHeu_WO6lXNmaRSL76MNY7su2Q&s=10"},

{id:222,category:"innerwear",subcategory:"sets",name:"Comfort Cotton Lingerie Set",price:"₹699",badge:"Comfort",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1TUslGGgg3bSCkxRXZgUMgXcgDAKtiM45WdtnqL4cTQ&s=10"},

{id:223,category:"innerwear",subcategory:"sets",name:"Seamless Everyday Lingerie Set",price:"₹799",badge:"Seamless",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0RvWqGAvk3CZdz0FzPadfs1FbOTHYUtigxbOzFKdDQw&s"},

{id:224,category:"innerwear",subcategory:"sets",name:"Mesh Lace Lingerie Set",price:"₹1,199",badge:"Stylish",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqYTERE3rTya9KCU4jNKDkofwl6UmzZqSI0v2a0f3wSw&s"},

{id:225,category:"innerwear",subcategory:"sets",name:"Strappy Bralette and Panty Set",price:"₹899",badge:"Trendy",image:"https://m.media-amazon.com/images/I/81WUlwaFktL._SX679_.jpg"},

{id:226,category:"innerwear",subcategory:"sets",name:"Ribbed Bralette Lingerie Set",price:"₹749",badge:"Modern",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_-BTUfSGznvdfWiRZFsPaAjVMtjC3rowSkT02q4dOCQ&s=10"},

{id:227,category:"innerwear",subcategory:"sets",name:"High Waist Lace Lingerie Set",price:"₹999",badge:"Elegant",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP1ZLaewiSKZ6aascQN1l0vt-2ObadnkDtVUDMLLO07g&s=10"},

{id:228,category:"innerwear",subcategory:"sets",name:"Satin Lace Trim Lingerie Set",price:"₹1,299",badge:"Luxury",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyp8qRCNYcaYt8cGAtxiW2FGQZoSa8Cisf64hkYgVtaw&s=10"},

{id:229,category:"innerwear",subcategory:"sets",name:"Wireless Bra and Panty Set",price:"₹849",badge:"Comfort",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIwREwvaRqtaGm4sGyfry2WOrG5Yq9COtv4NbNu6Rr7Q&s"},

{id:230,category:"innerwear",subcategory:"sets",name:"Soft Microfiber Lingerie Set",price:"₹799",badge:"Soft Fabric",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcThuvFvJdrBhqPit-OE_kvDvhR6uvFB33B4jTrRGjheDg&s"},

{id:231,category:"innerwear",subcategory:"sets",name:"Embroidered Lace Lingerie Set",price:"₹1,199",badge:"Premium",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFUGWSFfaiCh2deCI1lCjuD-apOH2T4oAHZ9Anwh000Q&s"},

{id:232,category:"innerwear",subcategory:"sets",name:"Bralette and High Waist Panty Set",price:"₹949",badge:"Popular",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRKx_4pyYezQb4W9vMT-sWjnXCnnIMezmIYeixgJfo8g&s=10"},

{id:233,category:"innerwear",subcategory:"sets",name:"Cotton Lace Everyday Set",price:"₹699",badge:"Everyday",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStLDUtSmqNMCI85ocgFHElCK57cnWtQM5svpJ4FNIESg&s=10"},

{id:234,category:"innerwear",subcategory:"sets",name:"Premium Satin Lingerie Set",price:"₹1,399",badge:"Luxury",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrzF2c9ivv4AiYS0nIGqmbFog96ruLwy5JUUgHC0x9Eg&s"},
{id:235,category:"innerwear",subcategory:"shapewear",name:"High Waist Tummy Control Shapewear",price:"₹899",badge:"Bestseller",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH2YonGmknQoYQ5SY2EpleIOELq9rgEqaAhW3Ama4OBg&s"},

{id:236,category:"innerwear",subcategory:"shapewear",name:"Full Body Slimming Shapewear",price:"₹1,299",badge:"Premium",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSP13FfjCXqGAWXlnyeoa-w8IV5eUbrmBtav2Xz-ziRMA&s=10"},

{id:237,category:"innerwear",subcategory:"shapewear",name:"Waist Cincher Shapewear",price:"₹799",badge:"Popular",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS-Ak2Az7RJPPveH7Jh5WH8AtOElS67iE5faolzV5xTag&s=10"},

{id:238,category:"innerwear",subcategory:"shapewear",name:"High Waist Tummy Control Shorts",price:"₹699",badge:"Comfort",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ14LWDCfkTFnGFgbIZDsFwUtf1qoExaYn0zjpu2h92jw&s=10"},

{id:239,category:"innerwear",subcategory:"shapewear",name:"Thigh Slimming Shapewear Shorts",price:"₹749",badge:"Trending",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtFQV7jzeQQ74n3XecjcCmdzRbWsREL_6T1c4jpZR1eQ&s=10"},

{id:240,category:"innerwear",subcategory:"shapewear",name:"Body Shaping Slip Dress",price:"₹999",badge:"Elegant",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_3it9-hZ5BhxAy1vq6OpvDw6H6kPtisIZkrx8SWIgRw&s"},

{id:241,category:"innerwear",subcategory:"shapewear",name:"Seamless Waist Shaper",price:"₹849",badge:"Seamless",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTv6MAbS-IM4ZoP0xbNrh921A1o3bdu53XWcht6kao71w&s=10"},

{id:242,category:"innerwear",subcategory:"shapewear",name:"Hip and Tummy Control Shapewear",price:"₹899",badge:"Comfort",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRK-3dGDyoG-18M3KT2NTaR4eu8GbGyCLMIYI0P4sjeDA&s=10"},

{id:243,category:"innerwear",subcategory:"shapewear",name:"High Compression Body Shaper",price:"₹1,399",badge:"Premium",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHRiiSwEaD2rrC94cpbaG1ZeT7_KKJFPU_o1btkHfJDw&s=10"},

{id:244,category:"innerwear",subcategory:"shapewear",name:"Butt Lifting Shapewear Shorts",price:"₹799",badge:"Trending",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCWW0SPFvLSBfZZqSKrpRTucLsvKzecRRWNXed3dgE1g&s=10"},

{id:245,category:"innerwear",subcategory:"shapewear",name:"Open Bust Full Body Shaper",price:"₹1,199",badge:"Popular",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQMKgXKR2fOsy1m9CrUy50xIzlQlco5uHLfmHEI5oYGrQ&s=10"},

{id:246,category:"innerwear",subcategory:"shapewear",name:"Waist and Thigh Control Shaper",price:"₹899",badge:"Sculpting",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR4Dvz2y-9FVdc9qmbc06aTvKoDlxuRcNJF7EjQ2E5Tag&s=10"},

{id:247,category:"innerwear",subcategory:"shapewear",name:"Seamless Full Body Shapewear",price:"₹1,299",badge:"Seamless",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqBZMnVQRYWMUNUtGBjU07hNhNPQGX8xws0zBk-NxsPg&s"},

{id:248,category:"innerwear",subcategory:"shapewear",name:"High Waist Sculpting Brief",price:"₹649",badge:"Everyday",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTelek8Z-Sz07MEf9VqQPpt5dF6eCQfHwy0wMF3ruYMFA&s=10"},

{id:249,category:"innerwear",subcategory:"shapewear",name:"Mid Thigh Body Shaper",price:"₹799",badge:"Comfort",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGVlaKMriudTJVbJXYzrQ7ThMW0_JBMd3HF-Wu4mjFYQ&s=10"},

{id:250,category:"innerwear",subcategory:"shapewear",name:"Premium Lace Shaping Bodysuit",price:"₹1,499",badge:"Luxury",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDOhiXyiV_h-Txdx5zMT5reQT5LuvikXJrZSV3auqofA&s"},
{id:251,category:"innerwear",subcategory:"sportswear",name:"High Support Sports Bra",price:"₹799",badge:"Performance",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBxMKQcSQtpciSxKchyWFMcq4KvFfljAgvid3oJeUgAQ&s"},

{id:252,category:"innerwear",subcategory:"sportswear",name:"Seamless Workout Sports Bra",price:"₹699",badge:"Seamless",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsRerp6YZp70tTOUEZk7gs5yZRMbc58QWWZGHBjse7fw&s=10"},

{id:253,category:"innerwear",subcategory:"sportswear",name:"Women High Waist Gym Leggings",price:"₹999",badge:"Bestseller",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaxwMkizlBb3gCKRqbs4fnzaq8cySWWjjaQ8ZlN9FGHA&s=10"},

{id:254,category:"innerwear",subcategory:"sportswear",name:"Quick Dry Running T-Shirt",price:"₹699",badge:"Quick Dry",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRzzHDE1SU_vr-iE_8TjgjCrnnF0VEr14k7sCcx_2hZQ&s=10"},

{id:255,category:"innerwear",subcategory:"sportswear",name:"Women's Yoga Leggings",price:"₹899",badge:"Comfort",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyCyhY6mttt99LG1ZRzyiXPajrWkZ91ZcpT9Syww_H5w&s=10"},

{id:256,category:"innerwear",subcategory:"sportswear",name:"Workout Crop Top",price:"₹599",badge:"Trending",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0K7cKSUlwfCszSlS81vMQcJNGfc-gqjX8ofsS_31Dbg&s"},

{id:257,category:"innerwear",subcategory:"sportswear",name:"Women Running Shorts",price:"₹649",badge:"Lightweight",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_C5BKWbDOT-g5cmC26k6VlDf-7avpFT9x9_Lbcs8FFg&s"},

{id:258,category:"innerwear",subcategory:"sportswear",name:"Full Sleeve Training Top",price:"₹799",badge:"Activewear",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKRkCLjNf89l8f2ETUMDxBoRigJbDBok0s3D_EkWup7w&s=10"},

{id:259,category:"innerwear",subcategory:"sportswear",name:"Women's Gym Co-Ord Set",price:"₹1,299",badge:"Popular",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeaQdh0WAd3f4zB1l9f-YwCPtg21lqThu6tY7yUwEvEg&s=10"},

{id:260,category:"innerwear",subcategory:"sportswear",name:"High Impact Training Sports Bra",price:"₹899",badge:"High Support",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSynTGl04wBgleFvCT8r0kPR7nv87YNL7Vd26q6FhVCjw&s=10"},

{id:261,category:"innerwear",subcategory:"sportswear",name:"Women's Cycling Shorts",price:"₹699",badge:"Performance",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgAXM-PuH3vaw-yiUoqRY_phWIZ9q9yxnbs1t_QvbEfQ&s=10"},

{id:262,category:"innerwear",subcategory:"sportswear",name:"Athleisure Jogger Pants",price:"₹999",badge:"Comfort",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4X0A4Yl9_Nid8RdG_E_ODk3ZPFHq9ROcuk6ldBgupM6QUrF7bu-bWDqY&s=10"},

{id:263,category:"innerwear",subcategory:"sportswear",name:"Sleeveless Workout Tank Top",price:"₹549",badge:"Breathable",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3gVqRaJoHSGkCTMnR_cn7pBark3z1ufA_X5iHB3Dmqw&s=10"},

{id:264,category:"innerwear",subcategory:"sportswear",name:"Women's Track Pants",price:"₹899",badge:"Everyday",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_tXOy5FS3_n96GZor7tYAXLA9jbmdIfkiWw4nwuhzZg&s=10"},

{id:265,category:"innerwear",subcategory:"sportswear",name:"Yoga Top and Leggings Set",price:"₹1,199",badge:"Yoga",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSafCH5H7noNQyk96MgpQ9r9seocW6GUmqh_n1zmXAVuw&s=10"},

{id:266,category:"innerwear",subcategory:"sportswear",name:"Premium Women's Training Set",price:"₹1,499",badge:"Premium",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrlJz8hzPlBQqWidSmt2SjbQlKp1T5UgdqI1PKTF_Opg&s=10"},
{id:267,category:"innerwear",subcategory:"camisoles",name:"Cotton Spaghetti Strap Camisole",price:"₹399",badge:"Everyday",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2A7y7lXtnCfuC-6Q0Nj7eEm_ELDqH1KX3wt5SZBCnDA&s=10"},

{id:268,category:"innerwear",subcategory:"camisoles",name:"Seamless Basic Camisole",price:"₹449",badge:"Seamless",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqjta35lqfxw7BQEVx2XUcjsuGMyapGRwYvkEJAfCy0g&s"},

{id:269,category:"innerwear",subcategory:"camisoles",name:"Soft Cotton Inner Camisole",price:"₹349",badge:"Comfort",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsQyZB9Baa05tw5RsKPPH1OS_JIRSVd5RLWhcDKsRhzA&s"},

{id:270,category:"innerwear",subcategory:"camisoles",name:"Padded Spaghetti Camisole",price:"₹599",badge:"Popular",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq_IkbXs6_XeRIptQyDE6ZeazA5DSdyDAZ4NW0pyzSlA&s=10"},

{id:271,category:"innerwear",subcategory:"camisoles",name:"Adjustable Strap Camisole Top",price:"₹399",badge:"Adjustable",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZkS1NgroigObE41GqyhmTm1vBG_rWMDj-Xis9EHxlTg&s"},

{id:272,category:"innerwear",subcategory:"camisoles",name:"Ribbed Cotton Camisole",price:"₹449",badge:"Trending",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsXwtkpgEZNCMxm5NiWMivuBg8Icn-LuL9BuUhO-nfWA&s"},

{id:273,category:"innerwear",subcategory:"camisoles",name:"Full Coverage Inner Camisole",price:"₹499",badge:"Coverage",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxcs325Fw9b9MlcUpBsbiIP50nhJam6sNCwI6ZR0fbDA&s=10"},

{id:274,category:"innerwear",subcategory:"camisoles",name:"Lace Trim Camisole",price:"₹549",badge:"Elegant",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFaWQSgCT1JfiR2JAjSNNK0yHwv1YUfMvZXVK4lGHWTw&s=10"},

{id:275,category:"innerwear",subcategory:"camisoles",name:"Stretchable Everyday Camisole",price:"₹399",badge:"Stretchable",image:"https://wyshlist.io/cdn/shop/files/l-k-dress-black-04-traquila-original-imah3z5ehtwzysxh.jpg?v=1733396767&width=1100"},

{id:276,category:"innerwear",subcategory:"camisoles",name:"V-Neck Cotton Camisole",price:"₹449",badge:"Comfort",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjnkY6J1LXeNG5BM0UK-8VMItRlv4uLiMCBEjk6Kj_Ag&s"},

{id:277,category:"innerwear",subcategory:"camisoles",name:"Satin Sleep Camisole",price:"₹699",badge:"Premium",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeWEZKH7aVHqhrjG4sPnAupykI1TQUpC_4AWFcRNwyNQ&s"},

{id:278,category:"innerwear",subcategory:"camisoles",name:"Longline Camisole Top",price:"₹499",badge:"Modern",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR90rtkrUoVmu0rD8fuc7Hp2ouxiO9-0l2aWQwiNE4mzg&s=10"},

{id:279,category:"innerwear",subcategory:"camisoles",name:"Seamless Stretch Camisole",price:"₹499",badge:"Seamless",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0x1EALlJXfdAuDkNXcfDk-JoZDvnI-wOfr5Zrfzsfnw&s"},

{id:280,category:"innerwear",subcategory:"camisoles",name:"Cotton Tank Style Camisole",price:"₹399",badge:"Breathable",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQniQ1s1B6xVyDBXQKCau9LM8wrB-kYbIfYRWqDYrZX_w&s=10"},

{id:281,category:"innerwear",subcategory:"camisoles",name:"Built-In Bra Camisole",price:"₹649",badge:"Support",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVkLvOwATAq3Vta0lu2cM7paDf3iKDi8IM6WhVCwzqEw&s"},

{id:282,category:"innerwear",subcategory:"camisoles",name:"Premium Lace Camisole",price:"₹799",badge:"Luxury",image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0N_Bb0BrPH803Uto-lJCFMXJqYYVbzqCNPE9pCH034Q&s=10"},

{
    id: 299,
    category: "materials",
    subcategory: "personal",
    name: "Printed Cotton Material",
    price: "₹799",
    badge: "Fresh",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMbBoyQ7cwv4dWD__x1oZDaP_juFBPy2LLyCTQMLT9tA&s=10"
  },
  {
    id: 300,
    category: "materials",
    subcategory: "personal",
    name: "Floral Rayon Dress Material",
    price: "₹899",
    badge: "Popular",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf7McYHNwvyJ9umoEzasqoWmvsKodxbzqwaZ52J3j1GA&s=10"
  },
  {
    id: 301,
    category: "materials",
    subcategory: "personal",
    name: "Embroidered Chanderi Material",
    price: "₹1,299",
    badge: "Premium",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9TwvnbPF9UmxWCpxwsj1xEOy_3f7ddeOa7XGVMpBt5Q&s=10"
  },
  {
    id: 302,
    category: "materials",
    subcategory: "personal",
    name: "Silk Blend Dress Material",
    price: "₹1,499",
    badge: "Trending",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6iqHY_EUiJXH14CQYYfcgPasxuiNWB_EJ9gmpPV1ACQ&s"
  },
  {
    id: 303,
    category: "materials",
    subcategory: "personal",
    name: "Georgette Printed Material",
    price: "₹999",
    badge: "New",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVpDrArsuFFT5VxI59IQGYT-voVe6ZR5jMC_n17Mz9Vg&s=10"
  },
  {
    id: 304,
    category: "clothing",
    subcategory: "sarees",
    name: "Traditional Kanchipuram Pattu Saree",
    price: "₹3,999",
    mrp: "₹7,999",
    offer: "50% OFF",
    badge: "Bestseller",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSH2qJwHLMyCnzSW9X2X_ygyVBGXPYWhxa4_uZ7EISrpc7UgFqvQbXgP75G&s=10"
  },
  {
    id: 305,
    category: "clothing",
    subcategory: "sarees",
    name: "Royal Red Bridal Pattu Saree",
    price: "₹5,499",
    mrp: "₹10,999",
    offer: "50% OFF",
    badge: "Wedding Special",
    image: "https://medias.utsavfashion.com/media/catalog/product/cache/1/image/1000x/040ec09b1e35df139433887a97daa66f/h/a/handloom-pure-silk-gadwal-saree-in-red-v1-stga444.jpg"
  },
  {
    id: 306,
    category: "clothing",
    subcategory: "sarees",
    name: "Elegant blue Zari Border Pattu Saree",
    price: "₹4,299",
    mrp: "₹8,599",
    offer: "50% OFF",
    badge: "Trending",
    image: "https://southloom.com/cdn/shop/files/Gemini_Generated_Image_rkp0carkp0carkp0.png?v=1777459756"
  },
  {
    id: 307,
    category: "clothing",
    subcategory: "sarees",
    name: "Grand kerala Pattu Saree",
    price: "₹6,499",
    mrp: "₹12,999",
    offer: "50% OFF",
    badge: "Premium",
    image: "https://kuthampullysarees.com/cdn/shop/files/rn-image_picker_lib_temp_4ce8ceca-46d3-4bf3-b9a6-327e0ae6de8f.jpg?v=1781968342&width=960"
  },
   {
    id: 308,
    category: "clothing",
    subcategory: "sarees",
    name: "Classic Purple Kanchipuram Pattu Saree",
    price: "₹4,499",
    mrp: "₹8,999",
    offer: "50% OFF",
    badge: "Bestseller",
    image: "https://assets-jiocdn.ajio.com/medias/sys_master/root1/20250907/And7/68bd3e018bfb9009ace55924/-473Wx593H-702205407-purple-MODEL.jpg"
  },
  {
    id: 309,
    category: "clothing",
    subcategory: "sarees",
    name: "Maroon Bridal  Pattu Saree",
    price: "₹6,499",
    mrp: "₹10,999",
    offer: "41% OFF",
    badge: "Wedding Special",
    image: "https://eflina.in/wp-content/uploads/2026/06/Meenakari-1g-double-warp-kanchi-pattu-sareeWhatsApp-Image-2026-06-06-at-6.21.24-PM.jpeg"
  },
  {
    id: 310,
    category: "clothing",
    subcategory: "sarees",
    name: "Maroon gold Border Pattu Saree",
    price: "₹5,299",
    mrp: "₹9,999",
    offer: "47% OFF",
    badge: "Trending",
    image: "https://odhni.com/cdn/shop/files/WhatsAppImage2026-10-08at12.43.22PM.jpg?v=1791455462&width=1200"
  },
  {
    id: 311,
    category: "clothing",
    subcategory: "sarees",
    name: "Mustard Yellow Traditional Pattu Saree",
    price: "₹3,899",
    mrp: "₹7,499",
    offer: "48% OFF",
    badge: "Festive Special",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNuuhe7qK6fDR9fw-XTdfJG-fvq-SUVXvqCDtAYZZbcQ&s=10"
  },
  {
    id: 312,
    category: "clothing",
    subcategory: "sarees",
    name: "Emerald Blue Bridal Pattu Saree",
    price: "₹7,299",
    mrp: "₹12,999",
    offer: "44% OFF",
    badge: "Premium",
    image: "https://assets-jiocdn.ajio.com/medias/sys_master/root/20240216/abO5/65cf635d05ac7d77bb5ee7dc/-473Wx593H-467080424-blue-MODEL.jpg"
  },
  {
    id: 313,
    category: "clothing",
    subcategory: "sarees",
    name: "Rose Pink border Soft  Pattu Saree",
    price: "₹3,499",
    mrp: "₹6,499",
    offer: "46% OFF",
    badge: "New Arrival",
    image: "https://mykaladhar.com/cdn/shop/files/DSC04781.jpg?v=1752931806"
  },
  {
    id: 314,
    category: "clothing",
    subcategory: "sarees",
    name: "Cream and Gold Grand Pattu Saree",
    price: "₹5,999",
    mrp: "₹10,999",
    offer: "45% OFF",
    badge: "Exclusive",
    image: "https://www.shaadidukaan.com/vogue/wp-content/uploads/2019/08/Heavy-Pattu-Saree-Bridal-Look.webp"
  },
  {
    id: 315,
    category: "clothing",
    subcategory: "sarees",
    name: "Orange Temple Border Pattu Saree",
    price: "₹4,799",
    mrp: "₹8,499",
    offer: "44% OFF",
    badge: "Traditional Pick",
    image: "https://odhni.com/cdn/shop/files/001178324.png?v=1791466365&width=1200"
  },
  {
    id: 316,
    category: "womenProducts",
    subcategory: "Footwear",
    name: "Women's Elegant Block Heels",
    price: "₹999",
    badge: "Bestseller",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwQlDfRNPSuEp8x0Kzzw8sR1d7_BnOSDAcFQLqPlrayQ&s=10"
  },
  {
    id: 317,
    category: "womenProducts",
    subcategory: "Footwear",
    name: "Women's Stylish Flat Sandals",
    price: "₹599",
    badge: "Popular",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU8twPcOInAMuNUmrUz2uJtXT9o9RBKR-3sL3kzeNgFw&s=10"
  },
  {
    id: 318,
    category: "womenProducts",
    subcategory: "Footwear",
    name: "Women's White Casual Sneakers",
    price: "₹1,299",
    badge: "Trending",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRnRGj_1dR5lUpg__bbbcBybJge7y_XziVOklsp-gmc-w&s=10"
  },
  {
    id: 319,
    category: "womenProducts",
    subcategory: "Footwear",
    name: "Women's Traditional Ethnic Juttis",
    price: "₹799",
    badge: "Ethnic Wear",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBsmfmwjiNY2JQacqa-Zpf0TDQkd1r8G7Z98IeTh3RUw&s"
  },
  {
    id: 320,
    category: "womenProducts",
    subcategory: "Footwear",
    name: "Women's Party Wear Stiletto Heels",
    price: "₹1,499",
    badge: "Party Wear",
    image: "https://rukminim3.flixcart.com/image/480/640/xif0q/sandal/1/v/4/4-72-heel-37-shoeflair-silver-original-imahjubg6ryhveyh.jpeg?q=90"
  },
  {
    id: 321,
    category: "womenProducts",
    subcategory: "Footwear",
    name: "Women's Comfortable Wedge Sandals",
    price: "₹899",
    badge: "Comfort Pick",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaITXw9V9dJmZ1_7WjNF09BQgMH8lItFaEYNrxm1xrlA&s=10"
  },
  {
    id: 322,
    category: "womenProducts",
    subcategory: "Footwear",
    name: "Women's Lightweight Shoes",
    price: "₹1,399",
    badge: "Sports Wear",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTx57Ls9L4djF1jSDfXOv54WYTATIxuqlM8VlmybyJxMA&s=10"
  },
  {
    id: 323,
    category: "womenProducts",
    subcategory: "Footwear",
    name: "Women's Fashion Ankle SANDALS",
    price: "₹1,799",
    badge: "New",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8vDikkhZjomW9ApNvxV9b8yVpZeFCXvLzEmjFgXAddQ&s=10"
  },
  {
    id: 324,
    category: "womenProducts",
    subcategory: "Footwear",
    name: "Women's Casual Slip-On Loafers",
    price: "₹899",
    badge: "Everyday Wear",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsT94uCyWCIMChI5g8sAJKBkZVopPM31aHRDzXyBU4jw&s=10"
  },
  {
    id: 325,
    category: "womenProducts",
    subcategory: "Footwear",
    name: "Women's Flats",
    price: "₹749",
    badge: "Elegant",
    image: "https://media-ea.landmarkshops.in/cdn-cgi/image/h=730,w=540,q=85,fit=cover/max-new/1000016553518-Grey-STONE-1000016553518_01-2100.jpg"
  },
  {
    id: 326,
    category: "womenProducts",
    subcategory: "Footwear",
    name: "Women's Cushioned Platform Slippers",
    price: "₹499",
    badge: "Budget Pick",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTimeTLKmIVw0IOWGTiWeNxFH5hsIIesQsXGZxq4OqW_A&s"
  },
  {
    id: 327,
    category: "womenProducts",
    subcategory: "Footwear",
    name: "Women's Elegant Pointed-Toe Mules",
    price: "₹1,099",
    badge: "Chic Style",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFySn4g8nn6UqlygdrIPGBu97AuWs-3Fy25NAOrmmWkQ&s=10"
  },
   {
    id: 328,
    category: "womenProducts",
    subcategory: "Beauty",
    name: "Vitamin C Brightening Face Serum",
    price: "₹499",
    badge: "Bestseller",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVEp1Wi7xlmV4F9ux0Z49Y4hTvsvLBBJN9cZ_bbmfycQ&s=10"
  },
  {
    id: 329,
    category: "womenProducts",
    subcategory: "Beauty",
    name: "Hydrating Aloe Vera Face Gel",
    price: "₹249",
    badge: "Popular",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT4heOFc10ODOAhQGhWqxm75qQ1gMyd2B1elyPml8q-Fg&s=10 url"
  },
  {
    id: 330,
    category: "womenProducts",
    subcategory: "Beauty",
    name: "Daily Moisturizing Face Lotion",
    price: "₹399",
    badge: "Everyday Essential",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR99Is_GpOr1qyGBwE7AZvhZS0OAcpXWoW2CeB4rHJ8mg&s=10 url"
  },
  {
    id: 331,
    category: "womenProducts",
    subcategory: "Beauty",
    name: "Gentle Foaming Face Wash",
    price: "₹299",
    badge: "Trending",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaGskWJJFpQd7aZxVRmTR3jhhGALT0iTsHrNJR37rwGw&s url"
  },
  {
    id: 332,
    category: "womenProducts",
    subcategory: "Beauty",
    name: "Nourishing Cocoa Butter Body Lotion",
    price: "₹349",
    badge: "New",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXmRUBBo_w0Ra15suI7QX-bnFRzDpMgiZqDMriNsoytQ&s=10 url"
  },
  {
    id: 333,
    category: "womenProducts",
    subcategory: "Beauty",
    name: "SPF 50 Daily Sunscreen",
    price: "₹449",
    badge: "Must Have",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStWI5J_qfX4xRSbmQpwc7Psto11C5I95cZq4a5qfsZDw&s=10 url"
  },
  {
    id: 334,
    category: "womenProducts",
    subcategory: "Beauty",
    name: "Rose Water Facial Toner",
    price: "₹279",
    badge: "Natural Care",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5wON2WWs_M3YIW0xstut8_AWWk0fbvjLICTSTIvpw9w&s=10 url"
  },
  {
    id: 335,
    category: "womenProducts",
    subcategory: "Beauty",
    name: "Overnight Hydrating Face Mask",
    price: "₹399",
    badge: "Editor's Pick",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc_RK5qOcmcCBUv8JYApIdT_KFMfvfrk1MBX6KhIm3tg&s=10 url"
  },
  {
    id: 336,
    category: "womenProducts",
    subcategory: "Beauty",
    name: "Nourishing Lip Balm",
    price: "₹149",
    badge: "Budget Pick",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZp4zuA5yeu4X7bSer6vGPyWEF_MKQN3obm_STwcP_2w&s url"
  },
  {
    id: 337,
    category: "womenProducts",
    subcategory: "Beauty",
    name: "Matte Liquid Lipstick",
    price: "₹349",
    badge: "Trending",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSB2pKPo_0SCdsDjYT2LwxtcUxZSfkEBdjYpEdSQwOAjQ&s url"
  },
  {
    id: 338,
    category: "womenProducts",
    subcategory: "Beauty",
    name: "Volumizing Black Mascara",
    price: "₹299",
    badge: "Best Seller",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgQIXXWaiixSchYPRS9o5xjhoRl26UNhkDZA_Rg2RDKQ&s=10 url"
  },
  {
    id: 339,
    category: "womenProducts",
    subcategory: "Beauty",
    name: "Shimmer Highlighter Makeup",
    price: "₹399",
    badge: "Glow Essential",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVjwRAx9NXDbe2zSrlguZYDvAImS8tNnwvYAc1mOVf-Q&s=10"
  },
  {
    id: 340,
    category: "womenProducts",
    subcategory: "Accessories",
    name: "Elegant Leather Tote Bag",
    price: "₹2,499",
    badge: "Bestseller",
    image: " https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbMIG-0lHza7AO7eRqAdSmiYuOCNHbJ3g2SRYZziCD6Q&s"
  },
  {
    id: 341,
    category: "womenProducts",
    subcategory: "Accessories",
    name: "Stylish Crossbody Sling Bag",
    price: "₹1,499",
    badge: "Trending",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS43NthKLAy7gI5EIBmazA0A6WNT69xRkFlQc3ZDRbgbQ&s=10 "
  },
  {
    id: 342,
    category: "womenProducts",
    subcategory: "Accessories",
    name: "Mini Party Wear Clutch",
    price: "₹999",
    badge: "Party Wear",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSfRZBDiTSaVp4e6qgXWdtYilg1gFQblUriTcJuUQY_w&s=10 "
  },
  {
    id: 343,
    category: "womenProducts",
    subcategory: "Accessories",
    name: "Classic Women's Wallet",
    price: "₹699",
    badge: "Popular",
    image: " https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7BCSUQGEOpca7Jrnt6eJAUwo3I4HtoW6YQvsIBT9FaA&s"
  },
  {
    id: 344,
    category: "womenProducts",
    subcategory: "Accessories",
    name: "Premium Quilted Shoulder Handbag",
    price: "₹2,499",
    badge: "Bestseller",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_nk-4SWf-btSoJcHQg8-6C3-SWw6EhJCuYmqw5doOQA&s=10"
  },
  {
    id: 345,
    category: "womenProducts",
    subcategory: "Accessories",
    name: "Trendy Mini Crossbody Handbag",
    price: "₹1,299",
    badge: "Trending",
    image: "https://rukminim2.flixcart.com/image/480/640/xif0q/sling-bag/6/h/m/stylish-flap-with-gold-buckle-premium-pu-leather-handbag-for-original-imahmpghjn2huxmd.jpeg?q=90"
  },
  // {
  //   id: 346,
  //   category: "womenProducts",
  //   subcategory: "Watches",
  //   name: "Elegant Rose Gold Women's Watch",
  //   price: "₹1,999",
  //   badge: "Premium",
  //   image: "image url"
  // },
  {
    id: 347,
    category: "womenProducts",
    subcategory: "Watches",
    name: "Classic Leather Strap Women's Watch",
    price: "₹1,499",
    badge: "New",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7jpS5pu6S3cu-vgn2LNKB-LVR2WbCXkExgwhb6_sFPA&s=10"
  },
  {
    id: 348,
    category: "womenProducts",
    subcategory: "Accessories",
    name: "Stylish Structured Top Handle Bag",
    price: "₹2,199",
    badge: "Popular",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVI3P7MWKqkyFWaKuP-T0NmbCcWbjRkIdHm9To2GfyvA&s=10"
  },

  {
    id: 350,
    category: "womenProducts",
    subcategory: "Watches",
    name: "Elegant Women's Wrist Watch",
    price: "₹1,799",
    badge: "Premium",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxgwubwVFuU2mo0z8eUf8VAX43I4N0YlJvXOTS8-CNWg&s=10"
  },
  {
    id: 351,
    category: "womenProducts",
    subcategory: "Accessories",
    name: "Embroidered Ethnic Potli Bag",
    price: "₹799",
    badge: "Traditional Pick",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQDpz3kB7m70-ULKI4coaTdV-t8t1_kloiDZ3b5IZqGA&s"
  },
  {
    id: 352,
    category: "skincare",
    subcategory: "personal",
    name: "Vitamin C Brightening Face Serum",
    price: "₹599",
    badge: "Bestseller",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxKqg-Sywu5FrvGNOR71OquSIsnS2BHBsbmXaO_6on4A&s=10"
  },
  {
    id: 353,
    category: "skincare",
    subcategory: "personal",
    name: "Hydrating Hyaluronic Acid Serum",
    price: "₹549",
    badge: "Popular",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7KiOVxRNvnT2VPvRsepgHmuMgARrGiERbAvmFQTCvsQ&s=10"
  },
  {
    id: 354,
    category: "skincare",
    subcategory: "personal",
    name: "Gentle Foaming Face Cleanser",
    price: "₹349",
    badge: "Daily Care",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToXwt9BsnV5LoKMd8mKUAe94L6l1vF3pJlW7Urh4EaLg&s=10"
  },
  {
    id: 355,
    category: "skincare",
    subcategory: "personal",
    name: "Aloe Vera Soothing Face Gel",
    price: "₹249",
    badge: "Natural Care",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQj2zCObEm_ejNlDXK87VRMmpAhDuF5pcLoldyUnYG0w&s=10"
  },
  {
    id: 356,
    category: "skincare",
    subcategory: "personal",
    name: "Oil-Free Daily Moisturizer",
    price: "₹399",
    badge: "New",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqK67SNru1dl09mztJt6oJSpgmuMi22AhEnM76Hm52bg&s=10"
  },
  {
    id: 357,
    category: "skincare",
    subcategory: "personal",
    name: "SPF 50 Sunscreen Gel",
    price: "₹499",
    badge: "Sun Protection",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTZGdFNT0ocrvUa1Bmm9xe2F3am1BqbAVGSXbMI8nOyQ&s"
  },
  {
    id: 358,
    category: "skincare",
    subcategory: "personal",
    name: "Deep Cleansing Charcoal Face Mask",
    price: "₹299",
    badge: "Trending",
    image: "https://beardo.in/cdn/shop/files/1_e830d875-a80b-4b46-aef3-c6a5ae55101f.jpg?v=1749641263"
  },
  {
    id: 359,
    category: "skincare",
    subcategory: "personal",
    name: "Rose Water Hydrating Face Mist",
    price: "₹279",
    badge: "Refreshing",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHFOwm0lbBBJSpcwIpj2YxA_UvBDzT4RyGumSWb7jIXw&s"
  },
  {
    id: 360,
    category: "skincare",
    subcategory: "personal",
    name: "Nourishing Night Repair Cream",
    price: "₹649",
    badge: "Premium",
    image: "https://images.meesho.com/images/products/455577633/pmk14_512.webp?width=512"
  },
  {
    id: 361,
    category: "skincare",
    subcategory: "personal",
    name: "Gentle Exfoliating Face Scrub",
    price: "₹329",
    badge: "Glow Care",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKXfBibVCRwKSNs245A5qxuCFb1kau6CtxV8CSoX8bMw&s"
  },
  {
    id: 362,
    category: "skincare",
    subcategory: "personal",
    name: "Hydrating Under-Eye Cream",
    price: "₹449",
    badge: "Eye Care",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgXY4CKwAgtJXF7QXv-Ld9myqDmMlzDDbwr7T7s9FAqA&s=10"
  },
  {
    id: 363,
    category: "skincare",
    subcategory: "personal",
    name: "Nourishing Lip Sleeping Mask",
    price: "₹299",
    badge: "Editor's Pick",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRI0-3TRwL_fK4NGZSgEKz1EpBvUI64eTvu1nKi9E_eVw&s=10"
  },
   {
    id: 364,
    category: "womenProducts",
    subcategory: "Watches",
    name: "Classic Leather Strap Women's Watch",
    price: "₹1,499",
    badge: "New",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQkZDEFOucb0RDadodQjHX2sv_phUsyKbN9lvlDbKb9w&s"
  },
  {
    id: 365,
    category: "womenProducts",
    subcategory: "Watches",
    name: "Elegant Rose Gold Women's Watch",
    price: "₹1,899",
    badge: "Trending",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxjQDeRGeUb5LeHfJpC91CwIDE8nwJ-jjXDuErrvRcNg&s=10"
  },
  {
    id: 366,
    category: "womenProducts",
    subcategory: "Watches",
    name: "Luxury Golden Chain Women's Watch",
    price: "₹2,499",
    badge: "Popular",
    image: "https://m.media-amazon.com/images/I/71iZVna3C9L._AC_UY1000_.jpg"
  },
  {
    id: 367,
    category: "womenProducts",
    subcategory: "Watches",
    name: "Minimalist White Dial Women's Watch",
    price: "₹1,299",
    badge: "New",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTs3hibU6DDH00F8Z4SpfWyBd_ZhP7URPa4CsfQ_K-L7Q&s=10"
  },
  {
    id: 368,
    category: "womenProducts",
    subcategory: "Watches",
    name: "Silver Stainless Steel Women's Watch",
    price: "₹1,799",
    badge: "Bestseller",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSBvfOWLqf69K5x78wa0j88pf81aYS2qwZNmP3i2A4CQw&s=10"
  },
  {
    id: 369,
    category: "womenProducts",
    subcategory: "Watches",
    name: "Diamond-Style Party Wear Women's Watch",
    price: "₹2,199",
    badge: "Premium",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3IMw4FW1q-FcEh4LmGKOqinxRCB-LkcZDpkvLNikWUw&s=10"
  },
  {
    id: 370,
    category: "womenProducts",
    subcategory: "Watches",
    name: "Casual Silicone Strap Women's Watch",
    price: "₹999",
    badge: "Trending",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTC49AqtaS3j6xigl5VCuThiyIzg_QUzsm6oBGs3rm1IQ&s=10"
  },
  {
    id: 371,
    category: "womenProducts",
    subcategory: "Watches",
    name: "Colorful Kids Watch",
    price: "₹499",
    badge: "Kids Special",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRq2o6Mcfhxpe6wMYR656hsrd7pF_X6cMmx5yuXH0bwyQ&s=10"
  },
  {
    id: 372,
    category: "womenProducts",
    subcategory: "Watches",
    name: "Digital LED Watch",
    price: "₹699",
    badge: "Popular",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7x6hD5JksOAgzNObsRM47TFABz_CzvKbLqggL2LQVJQ&s=10"
  },
  {
    id: 373,
    category: "womenProducts",
    subcategory: "Watches",
    name: "Unicorn Theme Girls' Watch",
    price: "₹599",
    badge: "New",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTveszrDQIYe553PtOQc_WmJi5x0o5NllLEXk0RTWytuw&s=10"
  },
  {
    id: 374,
    category: "womenProducts",
    subcategory: "Watches",
    name: "Sports Silicone Strap Kids Watch",
    price: "₹799",
    badge: "Trending",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOcXXWVURz5idp96g7-4JHLNkl59UlIJ8VDJ6Axgwo9A&s=10"
  },
  {
    id: 375,
    category: "womenProducts",
    subcategory: "Watches",
    name: "Educational Number Dial Kids Watch",
    price: "₹549",
    badge: "Kids Special",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHnlE-jfC9gVmiikboVHpHvD6vPbtn4Cv7b3O6nrihyQ&s"
  },
  {
    id: 376,
    category: "womenProducts",
    subcategory: "Watches",
    name: "Pink Butterfly Girls Watch",
    price: "₹599",
    badge: "New",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzY7hSO6i1QkkyaLtsK1LpvaRBSl078lR-T0skLkBYjw&s"
  },
  {
    id: 377,
    category: "womenProducts",
    subcategory: "Watches",
    name: "Purple Unicorn Digital Watch",
    price: "₹699",
    badge: "Trending",
    image: "https://ae-pic-a1.aliexpress-media.com/kf/S2b88ad65188d47db9894909b956f26f4B.jpg"
  },
  {
    id: 378,
    category: "womenProducts",
    subcategory: "Watches",
    name: "Cute Teddy Bear Strap Watch",
    price: "₹499",
    badge: "Popular",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYvTAIbIT0a66K7CoSQpzX2JJx-ABWxySMDYdUjyBeKg&s=10"
  },
  {
    id: 379,
    category: "womenProducts",
    subcategory: "Watches",
    name: "Silicone Strap Watch",
    price: "₹549",
    badge: "New",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRENQaWz9vizcWyPBLviXcwBqD1SNd1MrEwSDwi38TRPQ&s"
  },
  {
    id: 380,
    category: "womenProducts",
    subcategory: "Watches",
    name: "Princess Crown Girls Watch",
    price: "₹799",
    badge: "Bestseller",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKOEIP4ueKabEoqhZzsxDqqNPcXC855jqLusJ-dRtxnw&s"
  },
  {
    id: 381,
    category: "womenProducts",
    subcategory: "Watches",
    name: "Floral Pink Analog Watch",
    price: "₹649",
    badge: "Trending",
    image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTx8UCckDBIw3WuYiB-4zQ4MSxh3Vq5dhuehyp8wL8bIuIEt1qBPMgb-yYzQ3mK7Lur3lFL6XLM_SxVHewUDaqfd3SC3iz8DhfICeS7UbBACebFO1Y31YxX2w&usqp=CAc"
  },
  {
    id: 382,
    category: "womenProducts",
    subcategory: "Watches",
    name: "Heart-Shaped Dial Girls Watch",
    price: "₹699",
    badge: "New",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4CeItA8vMH336BjfTNvYY3S-gPlF4_Vau27p6NW3fKg&s=10"
  },
  {
    id: 383,
    category: "womenProducts",
    subcategory: "Watches",
    name: "Glitter Star Girls Watch",
    price: "₹749",
    badge: "Popular",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSdSoKsZ6b6ewjVhJINZiV2rqYInTuYJJZ66Vn5ex_8NQ&s"
  },
  {
    id: 384,
    category: "womenProducts",
    subcategory: "Watches",
    name: "Cute Cartoon Cat Girls Watch",
    price: "₹599",
    badge: "Trending",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKiyQ_I3hydZ3cgi6YLDiEmJwgpas9JeKmuki0ETslnw&s"
  },
  {
    id: 385,
    category: "womenProducts",
    subcategory: "Watches",
    name: "Elegant Rose Gold Girls Watch",
    price: "₹899",
    badge: "Premium",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRIO2k-mVyofNrqosa3oK95fHOOlETSthSJfpU0I2KWVw&s=10"
  },
  {
  id: 386,
  category: "womenProducts",
  subcategory: "Watches",
  name: "Cute Strawberry Print Girls Watch",
  price: "₹549",
  badge: "New",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQI2Njo_sUaiVLCLjRU8jq2vHcEKPhKGfx2KOV-xmge3w&s=10"
},
{
  id: 387,
  category: "womenProducts",
  subcategory: "Watches",
  name: "Pastel Blue Butterfly Girls Watch",
  price: "₹649",
  badge: "Trending",
  image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFTcMUMeeOTK-V-Rr7USf82Nb3DH6hWiR9QSofBEG78A&s"
},
{
    id: 388,
    category: "skincare",
    subcategory: "personal",
    name: "Gentle Foaming Face Wash",
    price: "₹199",
    badge: "Daily Care",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxOKhpzJ7ozWmpOlWhvpcqX2JC5X3U7vgadQ18x5lGlw&s"
  },
  {
    id: 389,
    category: "skincare",
    subcategory: "personal",
    name: "Aloe Vera Soothing Face Gel",
    price: "₹249",
    badge: "Natural Care",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBwkmG1ewuRxru83D6Mc8U3_kZdG8K9ytVdwqkxGU0tQ&s=10"
  },
  {
    id: 390,
    category: "skincare",
    subcategory: "personal",
    name: "Vitamin C Face Serum",
    price: "₹399",
    badge: "Glow Care",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn02L-3rNwXsUt7R0whMn7HMquod61Zr91q2VQq24PRg&s=10"
  },
  {
    id: 391,
    category: "skincare",
    subcategory: "personal",
    name: "Hydrating Face Moisturizer",
    price: "₹299",
    badge: "Hydration",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3GKj9XJbNMCw1AsWMZVBTnvSeP8Wbhk-HM1Da_6qrJg&s=10"
  },
  {
    id: 392,
    category: "skincare",
    subcategory: "personal",
    name: "Rose Water Facial Toner",
    price: "₹179",
    badge: "Refreshing",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_M3OxKyl4efnYX1Rrbq52uSNFDelpunPDLNgVYize_Q&s=10"
  },
  {
    id: 393,
    category: "skincare",
    subcategory: "personal",
    name: "Daily Sunscreen SPF 50",
    price: "₹349",
    badge: "Sun Protection",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoGcjeBxdY1olRuMkp-GzwyyqyHhN-hISei9_FdlJ1qg&s=10"
  },
  {
    id: 394,
    category: "skincare",
    subcategory: "personal",
    name: "Gentle Micellar Cleansing Water",
    price: "₹279",
    badge: "Makeup Care",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzjOT409_Ulc0qo458lHKhQWkZwCvBwQxeHvvLgx6GBQ&s=10"
  },
  {
    id: 395,
    category: "skincare",
    subcategory: "personal",
    name: "Shea Butter Body Lotion",
    price: "₹299",
    badge: "Soft Skin",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrRHdwxs90XB3aHC25kiQg4h-T--OnHGkgOWsaOh_asg&s=10"
  },
  {
    id: 396,
    category: "skincare",
    subcategory: "personal",
    name: "Strawberry Lip Balm",
    price: "₹99",
    badge: "Lip Care",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT25CP2AzW-9Xn-1KuzrHJEaWh-6MM-3rZ8CytdTvGPnQ&s=10"
  },
  {
    id: 397,
    category: "skincare",
    subcategory: "personal",
    name: "Cucumber Under-Eye Gel",
    price: "₹229",
    badge: "Cooling Care",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0PnmKQZGnfIbXnyqpxU3RGBpUQhaYAPbYb9QvPXnTjQ&s"
  },
  {
    id: 398,
    category: "skincare",
    subcategory: "personal",
    name: "Honey and Oat Face Cleanser",
    price: "₹249",
    badge: "Gentle Care",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVNwPTsa7Be2QUYF96szka1kqXkTLJ3udQQqTm0GXXgg&s=10"
  },
  {
    id: 399,
    category: "skincare",
    subcategory: "personal",
    name: "Clay Purifying Face Mask",
    price: "₹299",
    badge: "Deep Clean",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqT4xCANrp-A9vYCQ-79vB-vQ0u-vTF_7F66vzqgdrAQ&s"
  },
  {
    id: 400,
    category: "skincare",
    subcategory: "personal",
    name: "Overnight Hydrating Face Cream",
    price: "₹449",
    badge: "Night Care",
    image: "https://thaneshop.com/wp-content/uploads/2025/12/Pilgrim-Swiss-Aqua-Rush%E2%84%A2-Overnight-Hydrating-Cream-with-Ceramides-50gm.jpg"
  },
  {
    id: 401,
    category: "skincare",
    subcategory: "personal",
    name: "Niacinamide Face Serum",
    price: "₹399",
    badge: "Skin Care",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvc7DLo9QwNDFYAtaisAkF8NxogKGIbpmiNoY8q9MDYQ&s=10"
  },
  {
    id: 402,
    category: "skincare",
    subcategory: "personal",
    name: "Gentle Exfoliating Face Scrub",
    price: "₹229",
    badge: "Smooth Skin",
    image: "https://innovist.com/cdn/shop/files/exfoliating_face_Scrub_100ml.jpg?v=1787219525&width=900"
  },
  {
    id: 403,
    category: "skincare",
    subcategory: "personal",
    name: "Cocoa Butter Hand Cream",
    price: "₹149",
    badge: "Hand Care",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWlKpzrTLEbY9dalSV54_D9X9zL3nfPnRPisKuFLAKHg&s=10"
  },
  {
    id: 404,
    category: "skincare",
    subcategory: "personal",
    name: "Nourishing Body Butter",
    price: "₹399",
    badge: "Moisture Boost",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXNbDJwkj8cXjom6J9A_wxLCRDQj13sLSXsmnbwWPdKQ&s=10"
  },
  {
    id: 405,
    category: "skincare",
    subcategory: "personal",
    name: "Gentle Makeup Remover Balm",
    price: "₹329",
    badge: "Makeup Care",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTF_maoPWol334lLs5m-nhLOX6keU9awrhiqW5AMCbMag&s=10"
  },
  {
    id: 406,
    category: "skincare",
    subcategory: "personal",
    name: "Hydrating Sheet Face Mask",
    price: "₹99",
    badge: "Instant Hydration",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgeS8SoE9Y_hShktNbIiY7JjCrcbKAWbliXr-I_wu9Ag&s"
  },
  {
    id: 407,
    category: "skincare",
    subcategory: "personal",
    name: "Gentle Lip and Cheek Balm",
    price: "₹199",
    badge: "Everyday Essential",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiNej40SFQagzvu7yf9O87zu8rUXuhMdrVwLkdYVRiEQ&s"
  }
  
].map((product) => ({
  ...product,
  mrp: product.mrp || generateMrp(product.price),
  offer: product.offer || getRandomOffer()
}));

export const categories = [
 {title:"Women’s Clothing",text:"Sarees, kurtis, dresses, ethnic sets and everyday styles.",icon:"bi-person-standing-dress",path:"/clothing"},
 {title:"Women’s Products",text:"Everyday personal essentials selected for comfort.",icon:"bi-heart",path:"/women-products"},
 {title:"Skincare",text:"Simple skincare and self-care picks for your routine.",icon:"bi-flower1",path:"/skincare"},
 {title:"Dress Materials",text:"Fabrics and coordinated materials for your perfect outfit.",icon:"bi-layers",path:"/dress-materials"},
 {title:"Stitching",text:"Custom blouse, kurti and dress stitching services.",icon:"bi-scissors",path:"/stitching"}
];