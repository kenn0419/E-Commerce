import path from '../ultils/path';
import icons from './icon';


export const navigation = [
    {
        id: 1,
        value: 'HOME',
        path: `/${path.HOME}`
    },
    {
        id: 2,
        value: 'PRODUCTS',
        path: `/${path.ALL_PRODUCTS}`
    },
    {
        id: 3,
        value: 'BLOGS',
        path: `/${path.BLOG}`
    },
    {
        id: 4,
        value: 'OUR SERVICES',
        path: `/${path.OUR_SERVICES}`
    },
    {
        id: 5,
        value: 'FAQs',
        path: `/${path.FAQ}`
    }
]

export const extraInfo = [
    {
        id: 1,
        title: 'Guarantee',
        sub: 'Quality Checked',
        icon: icons.FaShieldAlt
    },
    {
        id: 2,
        title: 'Free Shipping',
        sub: 'Free On All Products',
        icon: icons.FaTruck
    },
    {
        id: 3,
        title: 'Special Gift Cards',
        sub: 'Special Gift Cards',
        icon: icons.FaGift
    },
    {
        id: 4,
        title: 'Free Return',
        sub: 'Within 7 Days',
        icon: icons.FaReply
    },
    {
        id: 5,
        title: 'Consultancy',
        sub: 'Lifetime 24/7/356',
        icon: icons.FaTty
    },
]

export const productTabs = [
    {
        id: 1,
        name: 'DESCRIPTION',
        content: `echnology: GSM / HSPA / LTE
        Dimensions: 144.6 x 69.2 x 7.3 mm
        Weight: 129 g
        Display: IPS LCD 5.15 inches
        Resolution: 1080 x 1920
        OS: Android OS, v6.0 (Marshmallow)
        Chipset: Snapdragon 820
        CPU: Quad-core
        Internal: 32GB/64GB/128GB
        Camera: 16 MP, f/2.0 - 4 MP, f/2.0`
    },
    {
        id: 2,
        name: 'WARRANTY',
        content: `LIMITED WARRANTIES
        Limited Warranties are non-transferable. The following Limited Warranties are given to the original retail purchaser of the following Ashley Furniture Industries, Inc.Products:
        
        Frames Used In Upholstered and Leather Products
        Limited Lifetime Warranty
        A Limited Lifetime Warranty applies to all frames used in sofas, couches, love seats, upholstered chairs, ottomans, sectionals, and sleepers. Ashley Furniture Industries,Inc. warrants these components to you, the original retail purchaser, to be free from material manufacturing defects.`
    },
    {
        id: 3,
        name: 'DELIVERY',
        content: `Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
        Picking up at the store
        Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
        Delivery
        Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.
        In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.`
    },
    {
        id: 4,
        name: 'PAYMENT',
        content: `Before you make your purchase, it’s helpful to know the measurements of the area you plan to place the furniture. You should also measure any doorways and hallways through which the furniture will pass to get to its final destination.
        Picking up at the store
        Shopify Shop requires that all products are properly inspected BEFORE you take it home to insure there are no surprises. Our team is happy to open all packages and will assist in the inspection process. We will then reseal packages for safe transport. We encourage all customers to bring furniture pads or blankets to protect the items during transport as well as rope or tie downs. Shopify Shop will not be responsible for damage that occurs after leaving the store or during transit. It is the purchaser’s responsibility to make sure the correct items are picked up and in good condition.
        Delivery
        Customers are able to pick the next available delivery day that best fits their schedule. However, to route stops as efficiently as possible, Shopify Shop will provide the time frame. Customers will not be able to choose a time. You will be notified in advance of your scheduled time frame. Please make sure that a responsible adult (18 years or older) will be home at that time.
        In preparation for your delivery, please remove existing furniture, pictures, mirrors, accessories, etc. to prevent damages. Also insure that the area where you would like your furniture placed is clear of any old furniture and any other items that may obstruct the passageway of the delivery team. Shopify Shop will deliver, assemble, and set-up your new furniture purchase and remove all packing materials from your home. Our delivery crews are not permitted to move your existing furniture or other household items. Delivery personnel will attempt to deliver the purchased items in a safe and controlled manner but will not attempt to place furniture if they feel it will result in damage to the product or your home. Delivery personnel are unable to remove doors, hoist furniture or carry furniture up more than 3 flights of stairs. An elevator must be available for deliveries to the 4th floor and above.`
    },
]

export const colors = [
    'black',
    'brown',
    'gray',
    'white',
    'pink',
    'yellow',
    'orange',
    'purple',
    'blue',
]

export const sorts = [
    {
        id: 1,
        value: '-sold',
        text: 'Best selling'
    },
    {
        id: 2,
        value: 'title',
        text: 'Alplabetically, A-Z'
    },
    {
        id: 3,
        value: '-title',
        text: 'Alplabetically, Z-A'
    },
    {
        id: 4,
        value: 'price',
        text: 'Price, low to high'
    },
    {
        id: 5,
        value: '-price',
        text: 'Price, high to low'
    },
    {
        id: 6,
        value: '-createdAt',
        text: 'Date, new to old'
    },
    {
        id: 7,
        value: 'createdAt',
        text: 'Date, old to new'
    },
]

export const votReview = [
    {
        id: 1,
        text: 'Terrible'
    },
    {
        id: 2,
        text: 'Bad'
    },
    {
        id: 3,
        text: 'Neutral'
    },
    {
        id: 4,
        text: 'Good'
    },
    {
        id: 5,
        text: 'Perfect'
    },
]

export const adminSidebar = [
    {
        id: 1,
        type: 'SINGLE',
        text: 'Dashboard',
        path: `/${path.ADMIN}/${path.DASHBOARD}`,
        icon: icons.MdDashboard
    },
    {
        id: 2,
        type: 'SINGLE',
        text: 'Manage User',
        path: `/${path.ADMIN}/${path.MANAGE_USER}`,
        icon: icons.MdGroup
    },
    {
        id: 3,
        type: 'PARENT',
        text: 'Manage Products',
        icon: icons.FaProductHunt,
        subMenu: [
            {
                text: 'Create Product',
                path: `/${path.ADMIN}/${path.CREATE_PRODUCTS}`
            },
            {
                text: 'Manage Products',
                path: `/${path.ADMIN}/${path.MANAGE_PRODUCTS}`
            }
        ]
    },
    {
        id: 4,
        type: 'SINGLE',
        text: 'Manage Orders',
        path: `/${path.ADMIN}/${path.MANAGE_ORDERS}`,
        icon: icons.MdOutlineProductionQuantityLimits
    },
]

export const memberSidebar = [
    {
        id: 1,
        text: 'Personal',
        type: 'SINGLE',
        path: `/${path.MEMBER}/${path.PERSONAL}`,
        icon: icons.MdOutlineBroadcastOnPersonal
    },
    {
        id: 2,
        text: 'My Cart',
        type: 'SINGLE',
        path: `/${path.MEMBER}/${path.MY_CART}`,
        icon: icons.FaCartArrowDown
    },
    {
        id: 3,
        text: 'Wishlist',
        type: 'SINGLE',
        path: `/${path.MEMBER}/${path.WISHLIST}`,
        icon: icons.TbFileLike
    },
    {
        id: 4,
        text: 'Buy History',
        type: 'SINGLE',
        path: `/${path.MEMBER}/${path.HISTORY}`,
        icon: icons.MdHistoryEdu
    },
]

export const roles = [
    {
        code: 0,
        value: 'Admin'
    },
    {
        code: 1,
        value: 'Member'
    }
]

export const blockStatus = [
    {
        code: true,
        value: 'Blocked'
    },
    {
        code: false,
        value: 'Active'
    }
]

export const statusOrder = [
    {
        label: 'Cancelled',
        value: 'Cancelled',
    },
    {
        label: 'Succeed',
        value: 'Succeed',
    },
]