export const registerFormControls = [
    {
        name: "userName",
        label: "User Name",
        placeholder: "Enter your user name",
        componentType: "input",
        type: "text",
    },
    {
        name: "email",
        label: "Email",
        placeholder: "Enter your email",
        componentType: "input",
        type: "email",
    },
    {
        name: "password",
        label: "Password",
        placeholder: "Enter your password",
        componentType: "input",
        type: "password",
    },
];
  
export const loginFormControls = [
    {
        name: "email",
        label: "Email",
        placeholder: "Enter your email",
        componentType: "input",
        type: "email",
    },
    {
        name: "password",
        label: "Password",
        placeholder: "Enter your password",
        componentType: "input",
        type: "password",
    },
];

export const addProductFormElements = [
    {
        label: "Title",
        name: "title",
        componentType: "input",
        type: "text",
        placeholder: "Enter product title",
    },
    {
        label: "Description",
        name: "description",
        componentType: "textarea",
        placeholder: "Enter product description",
    },
    {
        label: "Category",
        name: "category",
        componentType: "select",
        options: [
            { id: "fruits", label: "Fruits" },
            { id: "vegetables", label: "Vegetables" },
            { id: "dairy", label: "Dairy Products" },
            { id: "bakery", label: "Bakery Items" },
            { id: "beverages", label: "Beverages" },
        ],
    },
    {
        label: "Brand",
        name: "brand",
        componentType: "select",
        options: [
            { id: "amul", label: "Amul" },
            { id: "nestle", label: "Nestlé" },
            { id: "britannia", label: "Britannia" },
            { id: "haldiram", label: "Haldiram's" },
            { id: "pepsi", label: "PepsiCo" },
            { id: "coca_cola", label: "Coca-Cola" },
        ],
    },

    {
        label: "Audience",
        name: "audience",
        componentType: "select",
        options: [
            { id: "nepalese", label: "Nepalese" },
            { id: "indian", label: "Indian" },
            { id: "islanders", label: "Islanders" },
        ],
    },
      
    {
        label: "Price",
        name: "price",
        componentType: "input",
        type: "number",
        placeholder: "Enter product price",
    },
    {
        label: "Sale Price",
        name: "salePrice",
        componentType: "input",
        type: "number",
        placeholder: "Enter sale price (optional)",
    },
    {
        label: "Total Stock",
        name: "totalStock",
        componentType: "input",
        type: "number",
        placeholder: "Enter total stock",
    },
];

export const shoppingViewHeaderMenuItems = [
    {
        id: "home",
        label: "Home",
        path: "/shop/home",
    },
    {
        id: "products",
        label: "Products",
        path: "/shop/listing",
    },
    {
        id: "about-us",
        label: "About us",
        path: "/shop/about-us",
    },
    {
        id: "search",
        label: "Search",
        path: "/shop/search",
    },
];

export const categoryOptionsMap = {
    fruits : 'Fruits',
    vegetables : 'Vegetables',
    bakery : 'Bakery',
    beverages : 'Beverages',
    dairy : 'Dairy'
}

export const brandOptionsMap = {
    amul : 'Amul',
    nestle : 'Nestle',
    britannia : 'Britannia',
    haldiram : 'Haldiram',
    pepsi : 'Pepsi',
    coca_cola : 'Coca_cola'
}

export const audienceOptionsMap = {
    nepalese : 'Nepalese',
    indian : 'Indian',
    islanders : 'Islanders'
}

export const filterOptions = {
    category: [
        { id: "fruits", label: "Fruits" },
        { id: "vegetables", label: "Vegetables" },
        { id: "bakery", label: "Bakery" },
        { id: "beverages", label: "Beverages" },
        { id: "dairy", label: "Dairy" },
    ],
    brand: [
        { id: "amul", label: "Amul" },
        { id: "nestle", label: "Nestle" },
        { id: "britannia", label: "Britannia" },
        { id: "haldiram", label: "Haldiram" },
        { id: "pepsi", label: "Pepsi" },
        { id: "coca_cola", label: "Coca_cola" },
    ],
    audience: [
        { id: "nepalese", label: "Nepalese" },
        { id: "indian", label: "Indian" },
        { id: "islanders", label: "Islanders" },
    ]
};

export const sortOptions = [
    { id: "price-lowtohigh", label: "Price: Low to High" },
    { id: "price-hightolow", label: "Price: High to Low" },
    { id: "title-atoz", label: "Title: A to Z" },
    { id: "title-ztoa", label: "Title: Z to A" },
];


export const addressFormControls = [
    {
        label: "Address",
        name: "address",
        componentType: "input",
        type: "text",
        placeholder: "Enter your address",
    },
    {
        label: "City",
        name: "city",
        componentType: "input",
        type: "text",
        placeholder: "Enter your city",
    },
    {
        label: "Pincode",
        name: "pincode",
        componentType: "input",
        type: "text",
        placeholder: "Enter your pincode",
    },
    {
        label: "Phone",
        name: "phone",
        componentType: "input",
        type: "text",
        placeholder: "Enter your phone number",
    },
    {
        label: "Notes",
        name: "notes",
        componentType: "textarea",
        placeholder: "Enter any additional notes",
    },
];