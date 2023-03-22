export const links = [
  {
    name: "Orders",
    sub_links: [
      { name: "Orders", to: "/admin/orders/all", id: 1 },
    ],
    id:1
  },
  {
    name: "Products",
    sub_links: [
      { name: "New Product", to: "/admin/product/new", id: 1 },
      { name: "Products", to: "/admin/products/all", id: 2 },
    ],
    id:2
  },{
    name: "Users",
    sub_links: [
     
      { name: "Users", to: "/users/all", id: 1 },
    ],
    id:3
  },
  {
name:"Reviews",
id:4,
sub_links:[
  {name:"Reviews and Ratings",to:"/reviews",id:1}
]
  },
  {
    name: "Categories",
    sub_links: [
      { name: "New Category", to: "/admin/categories/new", id: 1 },
      { name: "New Sub Category", to: "/admin/sub_category", id: 3 },
      
      { name: "Categories", to: "/admin/categories/all", id: 2 },
      { name: "Sub Categories", to: "/admin/sub_categories/all", id: 4 },
    ],
    id:5
  },
];
