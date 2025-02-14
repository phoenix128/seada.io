/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: { input: string; output: string };
    String: { input: string; output: string };
    Boolean: { input: boolean; output: boolean };
    Int: { input: number; output: number };
    Float: { input: number; output: number };
    /** The `BigDecimal` scalar type represents signed fractional values with arbitrary precision. */
    BigDecimal: { input: any; output: any };
    /** ISO-8601 formatted date in UTC. (e.g. 2024-01-01T00:00:00Z) */
    DateTime: { input: any; output: any };
    /** The `Long` scalar type represents non-fractional signed whole numeric values. Long can represent values between -(2^63) and 2^63 - 1. */
    Long: { input: any; output: any };
};

/** An error due to customer registration being disabled on a storefront. */
export type AccountCreationDisabledError = Error & {
    __typename?: 'AccountCreationDisabledError';
    /** A description of the error. */
    message: Scalars['String']['output'];
};

/** Add cart line items data object */
export type AddCartLineItemsDataInput = {
    /** List of gift certificates */
    giftCertificates?: InputMaybe<Array<CartGiftCertificateInput>>;
    /** List of cart line items */
    lineItems?: InputMaybe<Array<CartLineItemInput>>;
};

/** Add cart line items input object */
export type AddCartLineItemsInput = {
    /** The cart id */
    cartEntityId: Scalars['String']['input'];
    /** Add cart line items data object */
    data: AddCartLineItemsDataInput;
    /** Version number. When provided, will reject the request if the version number is not the latest version of the cart, in order to prevent race conditions. */
    version?: InputMaybe<Scalars['Int']['input']>;
};

/** Add cart line items result */
export type AddCartLineItemsResult = {
    __typename?: 'AddCartLineItemsResult';
    /** The Cart that is updated as a result of mutation. */
    cart?: Maybe<Cart>;
};

/** Add checkout billing address data object */
export type AddCheckoutBillingAddressDataInput = {
    /** The checkout billing address */
    address: CheckoutAddressInput;
};

/** Add checkout billing address input object */
export type AddCheckoutBillingAddressInput = {
    /** The checkout id */
    checkoutEntityId: Scalars['String']['input'];
    /** Add checkout billing address data object */
    data: AddCheckoutBillingAddressDataInput;
    /** Version number. When provided, will reject the request if the version number is not the latest version of the cart, in order to prevent race conditions. */
    version?: InputMaybe<Scalars['Int']['input']>;
};

/** Add checkout billing address result */
export type AddCheckoutBillingAddressResult = {
    __typename?: 'AddCheckoutBillingAddressResult';
    /** The Checkout that is updated as a result of mutation. */
    checkout?: Maybe<Checkout>;
};

/** Add checkout shipping consignments data object */
export type AddCheckoutShippingConsignmentsDataInput = {
    /** The list of shipping consignments */
    consignments: Array<CheckoutShippingConsignmentInput>;
};

/** Add checkout shipping consignments input object */
export type AddCheckoutShippingConsignmentsInput = {
    /** The checkout id */
    checkoutEntityId: Scalars['String']['input'];
    /** Add checkout shipping consignments data object */
    data: AddCheckoutShippingConsignmentsDataInput;
    /** Version number. When provided, will reject the request if the version number is not the latest version of the cart, in order to prevent race conditions. */
    version?: InputMaybe<Scalars['Int']['input']>;
};

/** Apply checkout shipping consignments result */
export type AddCheckoutShippingConsignmentsResult = {
    __typename?: 'AddCheckoutShippingConsignmentsResult';
    /** The Checkout that is updated as a result of mutation. */
    checkout?: Maybe<Checkout>;
};

/** Possible response error when attempting to use AddCustomerAddress mutation. */
export type AddCustomerAddressError = CustomerAddressCreationError | CustomerNotLoggedInError | ValidationError;

/** Input for adding a customer address. */
export type AddCustomerAddressInput = {
    /** First line for the street address. */
    address1: Scalars['String']['input'];
    /** Second line for the street address. */
    address2?: InputMaybe<Scalars['String']['input']>;
    /** City. */
    city: Scalars['String']['input'];
    /** Company name associated with the address. */
    company?: InputMaybe<Scalars['String']['input']>;
    /** 2-letter country code. */
    countryCode: Scalars['String']['input'];
    /** First name of the address owner. */
    firstName: Scalars['String']['input'];
    /** Additional form fields defined by merchant. */
    formFields?: InputMaybe<CustomerFormFieldsInput>;
    /** Last name of the address owner. */
    lastName: Scalars['String']['input'];
    /** Phone number. */
    phone?: InputMaybe<Scalars['String']['input']>;
    /** Postal code for the address. This is only required for certain countries. */
    postalCode?: InputMaybe<Scalars['String']['input']>;
    /** Name of State or Province. */
    stateOrProvince?: InputMaybe<Scalars['String']['input']>;
};

/** Result of AddCustomerAddress mutation. */
export type AddCustomerAddressResult = {
    __typename?: 'AddCustomerAddressResult';
    /** Customer address that was created. */
    address?: Maybe<CustomerAddress>;
    /** List of response errors when attempting to submit an address. */
    errors: Array<AddCustomerAddressError>;
};

/** Error coming from submitting a product review. */
export type AddProductReviewError =
    | CustomerAlreadyReviewedProductError
    | InvalidInputFieldsError
    | NotAuthorizedToAddProductReviewError
    | ProductIdNotFoundError
    | UnexpectedAddReviewError;

/** Input for the addProductReview mutation. */
export type AddProductReviewInput = {
    /** ID of the product to submit reviews for. */
    productEntityId: Scalars['Long']['input'];
    /** The review to submit. */
    review: ProductReviewInput;
};

/** Result of the addProductReview mutation. */
export type AddProductReviewResult = {
    __typename?: 'AddProductReviewResult';
    /** Errors encountered while submitting the review. */
    errors: Array<AddProductReviewError>;
};

/** Add wishlist items input object */
export type AddWishlistItemsInput = {
    /** The wishlist id */
    entityId: Scalars['Int']['input'];
    /** The new wishlist items */
    items: Array<WishlistItemInput>;
};

/** Add wishlist items */
export type AddWishlistItemsResult = {
    __typename?: 'AddWishlistItemsResult';
    /** The wishlist */
    result: Wishlist;
};

/** A connection to a list of customer addresses. */
export type AddressConnection = {
    __typename?: 'AddressConnection';
    /** Collection info. */
    collectionInfo?: Maybe<CollectionInfo>;
    /** A list of edges. */
    edges?: Maybe<Array<AddressEdge>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};

/** An error due to providing an invalid or non-existent address ID.  */
export type AddressDoesNotExistError = Error & {
    __typename?: 'AddressDoesNotExistError';
    /** Error message. */
    message: Scalars['String']['output'];
};

/** An edge in a connection. */
export type AddressEdge = {
    __typename?: 'AddressEdge';
    /** A cursor for use in pagination. */
    cursor: Scalars['String']['output'];
    /** The item at the end of the edge. */
    node: CustomerAddress;
};

/** Aggregated */
export type Aggregated = {
    __typename?: 'Aggregated';
    /** Number of available products in stock. This can be 'null' if inventory is not set orif the store's Inventory Settings disable displaying stock levels on the storefront. */
    availableToSell: Scalars['Long']['output'];
    /** Indicates a threshold low-stock level.  This can be 'null' if the inventory warning level is not set or if the store's Inventory Settings disable displaying stock levels on the storefront. */
    warningLevel: Scalars['Int']['output'];
};

/** Aggregated Product Inventory */
export type AggregatedInventory = {
    __typename?: 'AggregatedInventory';
    /** Number of available products in stock. This can be 'null' if inventory is not set orif the store's Inventory Settings disable displaying stock levels on the storefront. */
    availableToSell: Scalars['Int']['output'];
    /** Indicates a threshold low-stock level. This can be 'null' if the inventory warning level is not set or if the store's Inventory Settings disable displaying stock levels on the storefront. */
    warningLevel: Scalars['Int']['output'];
};

/** Subject that should be created as a result of mutation would cause duplicate.  */
export type AlreadyExistsError = Error & {
    __typename?: 'AlreadyExistsError';
    /** A description of the error */
    message: Scalars['String']['output'];
};

/** Apply checkout coupon data object */
export type ApplyCheckoutCouponDataInput = {
    /** The checkout coupon code */
    couponCode: Scalars['String']['input'];
};

/** Apply checkout coupon input object */
export type ApplyCheckoutCouponInput = {
    /** The checkout id */
    checkoutEntityId: Scalars['String']['input'];
    /** Apply checkout coupon data object */
    data: ApplyCheckoutCouponDataInput;
    /** Version number. When provided, will reject the request if the version number is not the latest version of the cart, in order to prevent race conditions. */
    version?: InputMaybe<Scalars['Int']['input']>;
};

/** Apply checkout coupon result */
export type ApplyCheckoutCouponResult = {
    __typename?: 'ApplyCheckoutCouponResult';
    /** The Checkout that is updated as a result of mutation. */
    checkout?: Maybe<Checkout>;
};

/** Apply checkout spam protection data object */
export type ApplyCheckoutSpamProtectionDataInput = {
    /** The checkout spam protection token */
    token: Scalars['String']['input'];
};

/** Apply checkout spam protection input object */
export type ApplyCheckoutSpamProtectionInput = {
    /** The checkout id */
    checkoutEntityId: Scalars['String']['input'];
    /** Apply checkout spam protection data object */
    data: ApplyCheckoutSpamProtectionDataInput;
};

/** Apply checkout spam protection result */
export type ApplyCheckoutSpamProtectionResult = {
    __typename?: 'ApplyCheckoutSpamProtectionResult';
    /** The Checkout that is updated as a result of mutation. */
    checkout?: Maybe<Checkout>;
};

/** Assign cart to the customer input object. */
export type AssignCartToCustomerInput = {
    /** The cart id. */
    cartEntityId: Scalars['String']['input'];
    /** Version number. When provided, will reject the request if the version number is not the latest version of the cart, in order to prevent race conditions. */
    version?: InputMaybe<Scalars['Int']['input']>;
};

/** Assign cart to the customer result. */
export type AssignCartToCustomerResult = {
    __typename?: 'AssignCartToCustomerResult';
    /** The Cart that is updated as a result of mutation. */
    cart?: Maybe<Cart>;
};

/** Author */
export type Author = {
    __typename?: 'Author';
    /** Author name. */
    name: Scalars['String']['output'];
};

/** Banner details. */
export type Banner = Node & {
    __typename?: 'Banner';
    /** The content of the Banner. */
    content: Scalars['String']['output'];
    /** The id of the Banner. */
    entityId: Scalars['Long']['output'];
    /** The ID of the banner. */
    id: Scalars['ID']['output'];
    /** The location of the Banner. */
    location: BannerLocation;
    /** The name of the Banner. */
    name: Scalars['String']['output'];
};

/** A connection to a list of items. */
export type BannerConnection = {
    __typename?: 'BannerConnection';
    /** A list of edges. */
    edges?: Maybe<Array<BannerEdge>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};

/** An edge in a connection. */
export type BannerEdge = {
    __typename?: 'BannerEdge';
    /** A cursor for use in pagination. */
    cursor: Scalars['String']['output'];
    /** The item at the end of the edge. */
    node: Banner;
};

/** Banner location */
export enum BannerLocation {
    Bottom = 'BOTTOM',
    Top = 'TOP',
}

/** Banners details. */
export type Banners = {
    __typename?: 'Banners';
    /** List of brand page banners. */
    brandPage: BrandPageBannerConnection;
    /** List of category page banners. */
    categoryPage: CategoryPageBannerConnection;
    /** List of home page banners. */
    homePage: BannerConnection;
    /** List of search page banners. */
    searchPage: BannerConnection;
};

/** Banners details. */
export type BannersBrandPageArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    brandEntityId: Scalars['Int']['input'];
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** Banners details. */
export type BannersCategoryPageArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    categoryEntityId: Scalars['Int']['input'];
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** Banners details. */
export type BannersHomePageArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** Banners details. */
export type BannersSearchPageArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** Base order fields. */
export type BaseOrder = {
    /** Billing address. */
    billingAddress: OrderBillingAddress;
    /** Consignments. */
    consignments?: Maybe<OrderConsignments>;
    /** Message from customer */
    customerMessage?: Maybe<Scalars['String']['output']>;
    /** Discounts. */
    discounts: OrderDiscounts;
    /** Order ID. */
    entityId: Scalars['Int']['output'];
    /** Total cost of handling. */
    handlingCostTotal: Money;
    /** Indicates whether the taxes are included in the order total. */
    isTaxIncluded: Scalars['Boolean']['output'];
    /** Date and time the order was placed. */
    orderedAt: DateTimeExtended;
    /** Total cost of shipping. */
    shippingCostTotal: Money;
    /** Order status. */
    status: OrderStatus;
    /** Subtotal. */
    subTotal: Money;
    /** Total tax. */
    taxTotal: Money;
    /** Taxes. */
    taxes: Array<OrderTax>;
    /** The final order total payable amount inclusive of tax, before applying any store credit or gift certificate. */
    totalIncTax: Money;
    /** Date and time the order was last updated. */
    updatedAt: DateTimeExtended;
    /** Total cost of wrapping. */
    wrappingCostTotal: Money;
};

/** Blog details. */
export type Blog = Node & {
    __typename?: 'Blog';
    /** The description of the Blog. */
    description: Scalars['String']['output'];
    /** The ID of an object */
    id: Scalars['ID']['output'];
    /** Whether or not the blog should be visible in the navigation menu. */
    isVisibleInNavigation: Scalars['Boolean']['output'];
    /** The name of the Blog. */
    name: Scalars['String']['output'];
    /** The path of the Blog. */
    path: Scalars['String']['output'];
    /** Blog post details. */
    post?: Maybe<BlogPost>;
    /** Details of the Blog posts. */
    posts: BlogPostConnection;
    /** The rendered regions for the blog index. */
    renderedRegions: RenderedRegionsByPageType;
};

/** Blog details. */
export type BlogPostArgs = {
    entityId: Scalars['Int']['input'];
};

/** Blog details. */
export type BlogPostsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    filters?: InputMaybe<BlogPostsFiltersInput>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
    sort?: InputMaybe<SortBy>;
};

/** A blog index page. */
export type BlogIndexPage = Node &
    WebPage & {
        __typename?: 'BlogIndexPage';
        /** Unique ID for the web page. */
        entityId: Scalars['Int']['output'];
        /** The ID of an object */
        id: Scalars['ID']['output'];
        /** Whether or not the page should be visible in the navigation menu. */
        isVisibleInNavigation: Scalars['Boolean']['output'];
        /** Page name. */
        name: Scalars['String']['output'];
        /** Unique ID for the parent page. */
        parentEntityId?: Maybe<Scalars['Int']['output']>;
        /** The URL path of the page. */
        path: Scalars['String']['output'];
        /** The rendered regions for the web page. */
        renderedRegions: RenderedRegionsByPageType;
        /** Page SEO details. */
        seo: SeoDetails;
    };

/** Blog post details. */
export type BlogPost = Node & {
    __typename?: 'BlogPost';
    /** Blog post author. */
    author?: Maybe<Scalars['String']['output']>;
    /** Unique ID for the blog post. */
    entityId: Scalars['Int']['output'];
    /** The body of the Blog post. */
    htmlBody: Scalars['String']['output'];
    /** The ID of an object */
    id: Scalars['ID']['output'];
    /** Blog post name. */
    name: Scalars['String']['output'];
    /** Blog post path. */
    path: Scalars['String']['output'];
    /** The plain text summary of the Blog post. */
    plainTextSummary: Scalars['String']['output'];
    /** Blog post published date. */
    publishedDate: DateTimeExtended;
    /** The rendered regions for the blog post. */
    renderedRegions: RenderedRegionsByPageType;
    /** Blog post SEO details. */
    seo: SeoDetails;
    /** Blog post tags. */
    tags: Array<Scalars['String']['output']>;
    /** Blog post thumbnail image. */
    thumbnailImage?: Maybe<Image>;
};

/** Blog post details. */
export type BlogPostPlainTextSummaryArgs = {
    characterLimit?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of items. */
export type BlogPostConnection = {
    __typename?: 'BlogPostConnection';
    /** Collection info */
    collectionInfo?: Maybe<CollectionInfo>;
    /** A list of edges. */
    edges?: Maybe<Array<BlogPostEdge>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};

/** An edge in a connection. */
export type BlogPostEdge = {
    __typename?: 'BlogPostEdge';
    /** A cursor for use in pagination. */
    cursor: Scalars['String']['output'];
    /** The item at the end of the edge. */
    node: BlogPost;
};

/** Redirect to a blog post. */
export type BlogPostRedirect = {
    __typename?: 'BlogPostRedirect';
    /** Entity id. */
    entityId: Scalars['Int']['output'];
    /** The ID of an object. */
    id: Scalars['ID']['output'];
    /** Relative destination url. */
    path: Scalars['String']['output'];
};

/** Object containing the filters for querying blog posts */
export type BlogPostsFiltersInput = {
    /** Ids of the expected blog posts. */
    entityIds?: InputMaybe<Array<Scalars['Int']['input']>>;
    /** Tags of the expected blog posts. */
    tags?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** Brand */
export type Brand = Node & {
    __typename?: 'Brand';
    /** Default image for brand. */
    defaultImage?: Maybe<Image>;
    /** Id of the brand. */
    entityId: Scalars['Int']['output'];
    /** The ID of an object */
    id: Scalars['ID']['output'];
    /**
     * Meta description for the brand.
     * @deprecated Use SEO details instead.
     */
    metaDesc: Scalars['String']['output'];
    /**
     * Meta keywords for the brand.
     * @deprecated Use SEO details instead.
     */
    metaKeywords: Array<Scalars['String']['output']>;
    /** Metafield data related to a brand. */
    metafields: MetafieldConnection;
    /** Name of the brand. */
    name: Scalars['String']['output'];
    /**
     * Page title for the brand.
     * @deprecated Use SEO details instead.
     */
    pageTitle: Scalars['String']['output'];
    /** Path for the brand page. */
    path: Scalars['String']['output'];
    /** List of products associated with the brand. */
    products: ProductConnection;
    /** Search keywords for the brand. */
    searchKeywords: Array<Scalars['String']['output']>;
    /** Brand SEO details. */
    seo: SeoDetails;
};

/** Brand */
export type BrandMetafieldsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    keys?: InputMaybe<Array<Scalars['String']['input']>>;
    last?: InputMaybe<Scalars['Int']['input']>;
    namespace: Scalars['String']['input'];
};

/** Brand */
export type BrandProductsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    hideOutOfStock?: InputMaybe<Scalars['Boolean']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of items. */
export type BrandConnection = {
    __typename?: 'BrandConnection';
    /** A list of edges. */
    edges?: Maybe<Array<BrandEdge>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};

/** An edge in a connection. */
export type BrandEdge = {
    __typename?: 'BrandEdge';
    /** A cursor for use in pagination. */
    cursor: Scalars['String']['output'];
    /** The item at the end of the edge. */
    node: Brand;
};

/** A connection to a list of items. */
export type BrandPageBannerConnection = {
    __typename?: 'BrandPageBannerConnection';
    /** A list of edges. */
    edges?: Maybe<Array<BrandPageBannerEdge>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};

/** An edge in a connection. */
export type BrandPageBannerEdge = {
    __typename?: 'BrandPageBannerEdge';
    /** A cursor for use in pagination. */
    cursor: Scalars['String']['output'];
    /** The item at the end of the edge. */
    node: Banner;
};

/** Redirect to a brand. */
export type BrandRedirect = {
    __typename?: 'BrandRedirect';
    /** Entity id. */
    entityId: Scalars['Int']['output'];
    /** The ID of an object. */
    id: Scalars['ID']['output'];
    /** Relative destination url. */
    path: Scalars['String']['output'];
};

/** Brand Filter */
export type BrandSearchFilter = SearchProductFilter & {
    __typename?: 'BrandSearchFilter';
    /** List of available brands. */
    brands: BrandSearchFilterItemConnection;
    /** Indicates whether to display product count next to the filter. */
    displayProductCount: Scalars['Boolean']['output'];
    /** Indicates whether filter is collapsed by default. */
    isCollapsedByDefault: Scalars['Boolean']['output'];
    /** Display name for the filter. */
    name: Scalars['String']['output'];
};

/** Brand Filter */
export type BrandSearchFilterBrandsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** Specific brand filter item */
export type BrandSearchFilterItem = {
    __typename?: 'BrandSearchFilterItem';
    /** Brand ID. */
    entityId: Scalars['Int']['output'];
    /** Indicates whether brand is selected. */
    isSelected: Scalars['Boolean']['output'];
    /** Brand name. */
    name: Scalars['String']['output'];
    /** Indicates how many products available for this filter. */
    productCount: Scalars['Int']['output'];
};

/** A connection to a list of items. */
export type BrandSearchFilterItemConnection = {
    __typename?: 'BrandSearchFilterItemConnection';
    /** A list of edges. */
    edges?: Maybe<Array<BrandSearchFilterItemEdge>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};

/** An edge in a connection. */
export type BrandSearchFilterItemEdge = {
    __typename?: 'BrandSearchFilterItemEdge';
    /** A cursor for use in pagination. */
    cursor: Scalars['String']['output'];
    /** The item at the end of the edge. */
    node: BrandSearchFilterItem;
};

/** Breadcrumb */
export type Breadcrumb = {
    __typename?: 'Breadcrumb';
    /** Category id. */
    entityId: Scalars['Int']['output'];
    /** Name of the category. */
    name: Scalars['String']['output'];
    /** Path to the category. */
    path?: Maybe<Scalars['String']['output']>;
};

/** A connection to a list of items. */
export type BreadcrumbConnection = {
    __typename?: 'BreadcrumbConnection';
    /** A list of edges. */
    edges?: Maybe<Array<BreadcrumbEdge>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};

/** An edge in a connection. */
export type BreadcrumbEdge = {
    __typename?: 'BreadcrumbEdge';
    /** A cursor for use in pagination. */
    cursor: Scalars['String']['output'];
    /** The item at the end of the edge. */
    node: Breadcrumb;
};

/** Bulk pricing tier that sets a fixed price for the product or variant. */
export type BulkPricingFixedPriceDiscount = BulkPricingTier & {
    __typename?: 'BulkPricingFixedPriceDiscount';
    /** Maximum item quantity that applies to this bulk pricing tier - if not defined then the tier does not have an upper bound. */
    maximumQuantity?: Maybe<Scalars['Int']['output']>;
    /** Minimum item quantity that applies to this bulk pricing tier. */
    minimumQuantity: Scalars['Int']['output'];
    /** This price will override the current product price. */
    price: Scalars['BigDecimal']['output'];
};

/** Bulk pricing tier that reduces the price of the product or variant by a percentage. */
export type BulkPricingPercentageDiscount = BulkPricingTier & {
    __typename?: 'BulkPricingPercentageDiscount';
    /** Maximum item quantity that applies to this bulk pricing tier - if not defined then the tier does not have an upper bound. */
    maximumQuantity?: Maybe<Scalars['Int']['output']>;
    /** Minimum item quantity that applies to this bulk pricing tier. */
    minimumQuantity: Scalars['Int']['output'];
    /** The percentage that will be removed from the product price. */
    percentOff: Scalars['BigDecimal']['output'];
};

/** Bulk pricing tier that will subtract an amount from the price of the product or variant. */
export type BulkPricingRelativePriceDiscount = BulkPricingTier & {
    __typename?: 'BulkPricingRelativePriceDiscount';
    /** Maximum item quantity that applies to this bulk pricing tier - if not defined then the tier does not have an upper bound. */
    maximumQuantity?: Maybe<Scalars['Int']['output']>;
    /** Minimum item quantity that applies to this bulk pricing tier. */
    minimumQuantity: Scalars['Int']['output'];
    /** The price of the product/variant will be reduced by this priceAdjustment. */
    priceAdjustment: Scalars['BigDecimal']['output'];
};

/** A set of bulk pricing tiers that define price discounts which apply when purchasing specified quantities of a product or variant. */
export type BulkPricingTier = {
    /** Maximum item quantity that applies to this bulk pricing tier - if not defined then the tier does not have an upper bound. */
    maximumQuantity?: Maybe<Scalars['Int']['output']>;
    /** Minimum item quantity that applies to this bulk pricing tier. */
    minimumQuantity: Scalars['Int']['output'];
};

/** A cart */
export type Cart = Node & {
    __typename?: 'Cart';
    /** Sum of line-items amounts, minus cart-level discounts and coupons. This amount includes taxes (where applicable). */
    amount: Money;
    /** Cost of cart's contents, before applying discounts. */
    baseAmount: Money;
    /** Time when the cart was created. */
    createdAt: DateTimeExtended;
    /** ISO-4217 currency code. */
    currencyCode: Scalars['String']['output'];
    /** Discounted amount. */
    discountedAmount: Money;
    /** List of discounts applied to this cart. */
    discounts: Array<CartDiscount>;
    /** Cart ID. */
    entityId: Scalars['String']['output'];
    /** The ID of an object */
    id: Scalars['ID']['output'];
    /** Whether this item is taxable. */
    isTaxIncluded: Scalars['Boolean']['output'];
    /** List of line items. */
    lineItems: CartLineItems;
    /** Locale of the cart. */
    locale: Scalars['String']['output'];
    /** Metafield data related to a cart. */
    metafields: MetafieldConnection;
    /** Time when the cart was last updated. */
    updatedAt: DateTimeExtended;
    /** The current version of the cart, which is updated with every change. */
    version?: Maybe<Scalars['Int']['output']>;
};

/** A cart */
export type CartMetafieldsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    keys?: InputMaybe<Array<Scalars['String']['input']>>;
    last?: InputMaybe<Scalars['Int']['input']>;
    namespace: Scalars['String']['input'];
};

/** Cart custom item. */
export type CartCustomItem = {
    __typename?: 'CartCustomItem';
    /** ID of the custom item. */
    entityId: Scalars['String']['output'];
    /** Item's list price multiplied by the quantity. */
    extendedListPrice: Money;
    /** Price of the item. With or without tax depending on your stores set up. */
    listPrice: Money;
    /** Custom item name. */
    name: Scalars['String']['output'];
    /** Quantity of this item. */
    quantity: Scalars['Int']['output'];
    /** Custom item sku. */
    sku?: Maybe<Scalars['String']['output']>;
};

/** Cart digital item. */
export type CartDigitalItem = {
    __typename?: 'CartDigitalItem';
    /** The product brand. */
    brand?: Maybe<Scalars['String']['output']>;
    /** The total value of all coupons applied to this item. */
    couponAmount: Money;
    /** The total value of all discounts applied to this item (excluding coupon). */
    discountedAmount: Money;
    /** List of discounts applied to this item. */
    discounts: Array<CartDiscount>;
    /** The line-item ID. */
    entityId: Scalars['String']['output'];
    /** Item's list price multiplied by the quantity. */
    extendedListPrice: Money;
    /** Item's sale price multiplied by the quantity. */
    extendedSalePrice: Money;
    /** Image for the item. */
    image?: Maybe<Image>;
    /**
     * URL of an image of this item, accessible on the internet.
     * @deprecated Use `image` field instead.
     */
    imageUrl?: Maybe<Scalars['String']['output']>;
    /** Whether the item is taxable. */
    isTaxable: Scalars['Boolean']['output'];
    /** The net item price before discounts and coupons. It is based on the product default price or sale price (if set) configured in BigCommerce Admin. */
    listPrice: Money;
    /** The item's product name. */
    name: Scalars['String']['output'];
    /** An item’s original price is the same as the product default price in the admin panel. */
    originalPrice: Money;
    /** The product is part of a bundle such as a product pick list, then the parentId or the main product id will populate. */
    parentEntityId?: Maybe<Scalars['String']['output']>;
    /** ID of the product. */
    productEntityId: Scalars['Int']['output'];
    /** Quantity of this item. */
    quantity: Scalars['Int']['output'];
    /** Item's price after all discounts are applied. (The final price before tax calculation). */
    salePrice: Money;
    /** The list of selected options for this product. */
    selectedOptions: Array<CartSelectedOption>;
    /** SKU of the variant. */
    sku?: Maybe<Scalars['String']['output']>;
    /** The product URL. */
    url: Scalars['String']['output'];
    /** ID of the variant. */
    variantEntityId?: Maybe<Scalars['Int']['output']>;
};

/** Discount applied to the cart. */
export type CartDiscount = {
    __typename?: 'CartDiscount';
    /** The discounted amount applied within a given context. */
    discountedAmount: Money;
    /** ID of the applied discount. */
    entityId: Scalars['String']['output'];
};

/** Cart gift certificate */
export type CartGiftCertificate = {
    __typename?: 'CartGiftCertificate';
    /** Value must be between 1.00 and 1,000.00 in the store's default currency. */
    amount: Money;
    /** ID of this gift certificate. */
    entityId: Scalars['String']['output'];
    /** Whether or not the gift certificate is taxable. */
    isTaxable: Scalars['Boolean']['output'];
    /** Message that will be sent to the gift certificate's recipient. Limited to 200 characters. */
    message?: Maybe<Scalars['String']['output']>;
    /** GiftCertificate-provided name that will appear in the control panel. */
    name: Scalars['String']['output'];
    /** Recipient of the gift certificate. */
    recipient: CartGiftCertificateRecipient;
    /** Sender of the gift certificate. */
    sender: CartGiftCertificateSender;
    /** Currently supports Birthday, Boy, Celebration, Christmas, General, and Girl. None returned if all the above mentioned themes are disabled. */
    theme: CartGiftCertificateTheme;
};

/** Cart gift certificate input object */
export type CartGiftCertificateInput = {
    /** Value must be between 1.00 and 1,000.00 in the store's default currency. */
    amount: Scalars['BigDecimal']['input'];
    /** Message that will be sent to the gift certificate's recipient. Limited to 200 characters. */
    message?: InputMaybe<Scalars['String']['input']>;
    /** GiftCertificate-provided name that will appear in the control panel. */
    name: Scalars['String']['input'];
    /** The total number of certificates */
    quantity: Scalars['Int']['input'];
    /** Recipient of the gift certificate. */
    recipient: CartGiftCertificateRecipientInput;
    /** Sender of the gift certificate. */
    sender: CartGiftCertificateSenderInput;
    /** Currently supports Birthday, Boy, Celebration, Christmas, General, and Girl. */
    theme: CartGiftCertificateTheme;
};

/** Cart gift certificate recipient */
export type CartGiftCertificateRecipient = {
    __typename?: 'CartGiftCertificateRecipient';
    /** Contact's email address. */
    email: Scalars['String']['output'];
    /** Contact's name. */
    name: Scalars['String']['output'];
};

/** Cart gift certificate recipient input object */
export type CartGiftCertificateRecipientInput = {
    /** Contact's email address. */
    email: Scalars['String']['input'];
    /** Contact's name. */
    name: Scalars['String']['input'];
};

/** Cart gift certificate sender */
export type CartGiftCertificateSender = {
    __typename?: 'CartGiftCertificateSender';
    /** Contact's email address. */
    email: Scalars['String']['output'];
    /** Contact's name. */
    name: Scalars['String']['output'];
};

/** Cart gift certificate sender input object */
export type CartGiftCertificateSenderInput = {
    /** Contact's email address. */
    email: Scalars['String']['input'];
    /** Contact's name. */
    name: Scalars['String']['input'];
};

/** Cart gift certificate theme */
export enum CartGiftCertificateTheme {
    Birthday = 'BIRTHDAY',
    Boy = 'BOY',
    Celebration = 'CELEBRATION',
    Christmas = 'CHRISTMAS',
    General = 'GENERAL',
    Girl = 'GIRL',
    None = 'NONE',
}

/** Gift wrapping for the item */
export type CartGiftWrapping = {
    __typename?: 'CartGiftWrapping';
    /** Gift-wrapping price per product. */
    amount: Money;
    /** Custom gift message along with items wrapped in this wrapping option. */
    message?: Maybe<Scalars['String']['output']>;
    /** Name of the gift-wrapping option. */
    name: Scalars['String']['output'];
};

/** Cart line item input object */
export type CartLineItemInput = {
    /** The product id */
    productEntityId: Scalars['Int']['input'];
    /** Total number of line items. */
    quantity: Scalars['Int']['input'];
    /** The list of selected options for this item. */
    selectedOptions?: InputMaybe<CartSelectedOptionsInput>;
    /** The variant id */
    variantEntityId?: InputMaybe<Scalars['Int']['input']>;
};

/** Cart line items */
export type CartLineItems = {
    __typename?: 'CartLineItems';
    /** List of custom items. */
    customItems: Array<CartCustomItem>;
    /** List of digital items. */
    digitalItems: Array<CartDigitalItem>;
    /** List of gift certificates. */
    giftCertificates: Array<CartGiftCertificate>;
    /** List of physical items. */
    physicalItems: Array<CartPhysicalItem>;
    /** Total number of line items. */
    totalQuantity: Scalars['Int']['output'];
};

/** Cart mutations */
export type CartMutations = {
    __typename?: 'CartMutations';
    /** Adds line item(s) to the cart. */
    addCartLineItems?: Maybe<AddCartLineItemsResult>;
    /** Assign cart to the customer. */
    assignCartToCustomer?: Maybe<AssignCartToCustomerResult>;
    /** Creates a cart and generates a cart ID. */
    createCart?: Maybe<CreateCartResult>;
    /** Creates a metafield for cart object. */
    createCartMetafield: CreateCartMetafieldResult;
    /** Create single-use redirect URLs for a cart. */
    createCartRedirectUrls: CreateCartRedirectUrlsResult;
    /** Deletes a Cart. */
    deleteCart?: Maybe<DeleteCartResult>;
    /** Delete line item in the cart. Removing the last line item in the Cart deletes the Cart. */
    deleteCartLineItem?: Maybe<DeleteCartLineItemResult>;
    /** Deletes a metafield for cart object. */
    deleteCartMetafield: DeleteCartMetafieldResult;
    /** Unassign cart from the customer. */
    unassignCartFromCustomer?: Maybe<UnassignCartFromCustomerResult>;
    /** Update currency of the cart. */
    updateCartCurrency?: Maybe<UpdateCartCurrencyResult>;
    /** Updates line item in the cart. */
    updateCartLineItem?: Maybe<UpdateCartLineItemResult>;
    /** Updates a metafield for cart object. */
    updateCartMetafield: UpdateCartMetafieldResult;
};

/** Cart mutations */
export type CartMutationsAddCartLineItemsArgs = {
    input: AddCartLineItemsInput;
};

/** Cart mutations */
export type CartMutationsAssignCartToCustomerArgs = {
    input: AssignCartToCustomerInput;
};

/** Cart mutations */
export type CartMutationsCreateCartArgs = {
    input: CreateCartInput;
};

/** Cart mutations */
export type CartMutationsCreateCartMetafieldArgs = {
    input: CreateCartMetafieldInput;
};

/** Cart mutations */
export type CartMutationsCreateCartRedirectUrlsArgs = {
    input?: InputMaybe<CreateCartRedirectUrlsInput>;
};

/** Cart mutations */
export type CartMutationsDeleteCartArgs = {
    input: DeleteCartInput;
};

/** Cart mutations */
export type CartMutationsDeleteCartLineItemArgs = {
    input: DeleteCartLineItemInput;
};

/** Cart mutations */
export type CartMutationsDeleteCartMetafieldArgs = {
    input: DeleteCartMetafieldInput;
};

/** Cart mutations */
export type CartMutationsUnassignCartFromCustomerArgs = {
    input: UnassignCartFromCustomerInput;
};

/** Cart mutations */
export type CartMutationsUpdateCartCurrencyArgs = {
    input: UpdateCartCurrencyInput;
};

/** Cart mutations */
export type CartMutationsUpdateCartLineItemArgs = {
    input: UpdateCartLineItemInput;
};

/** Cart mutations */
export type CartMutationsUpdateCartMetafieldArgs = {
    input: UpdateCartMetafieldInput;
};

/** Cart physical item. */
export type CartPhysicalItem = {
    __typename?: 'CartPhysicalItem';
    /** The product brand. */
    brand?: Maybe<Scalars['String']['output']>;
    /** The total value of all coupons applied to this item. */
    couponAmount: Money;
    /** The total value of all discounts applied to this item (excluding coupon). */
    discountedAmount: Money;
    /** List of discounts applied to this item. */
    discounts: Array<CartDiscount>;
    /** The line-item ID. */
    entityId: Scalars['String']['output'];
    /** Item's list price multiplied by the quantity. */
    extendedListPrice: Money;
    /** Item's sale price multiplied by the quantity. */
    extendedSalePrice: Money;
    /** Gift wrapping for this item. */
    giftWrapping?: Maybe<CartGiftWrapping>;
    /** Image for the item. */
    image?: Maybe<Image>;
    /**
     * URL of an image of this item, accessible on the internet.
     * @deprecated Use `image` field instead.
     */
    imageUrl?: Maybe<Scalars['String']['output']>;
    /** Whether this item requires shipping to a physical address. */
    isShippingRequired: Scalars['Boolean']['output'];
    /** Whether the item is taxable. */
    isTaxable: Scalars['Boolean']['output'];
    /** The net item price before discounts and coupons. It is based on the product default price or sale price (if set) configured in BigCommerce Admin. */
    listPrice: Money;
    /** The item's product name. */
    name: Scalars['String']['output'];
    /** An item’s original price is the same as the product default price in the admin panel. */
    originalPrice: Money;
    /** The product is part of a bundle such as a product pick list, then the parentId or the main product id will populate. */
    parentEntityId?: Maybe<Scalars['String']['output']>;
    /** ID of the product. */
    productEntityId: Scalars['Int']['output'];
    /** Quantity of this item. */
    quantity: Scalars['Int']['output'];
    /** Item's price after all discounts are applied. (The final price before tax calculation). */
    salePrice: Money;
    /** The list of selected options for this item. */
    selectedOptions: Array<CartSelectedOption>;
    /** SKU of the variant. */
    sku?: Maybe<Scalars['String']['output']>;
    /** The product URL. */
    url: Scalars['String']['output'];
    /** ID of the variant. */
    variantEntityId?: Maybe<Scalars['Int']['output']>;
};

/** Cart redirect URLs. */
export type CartRedirectUrls = {
    __typename?: 'CartRedirectUrls';
    /** The single-use URL to the embedded checkout for the cart. Should be generated just-in-time (within 30s). */
    embeddedCheckoutUrl: Scalars['String']['output'];
    /** The single-use URL to the BigCommerce hosted checkout for the cart. Should be generated just-in-time (within 30s). */
    redirectedCheckoutUrl: Scalars['String']['output'];
};

/** Selected checkbox option. */
export type CartSelectedCheckboxOption = CartSelectedOption & {
    __typename?: 'CartSelectedCheckboxOption';
    /** The product option ID. */
    entityId: Scalars['Int']['output'];
    /** The product option name. */
    name: Scalars['String']['output'];
    /** The product option value. */
    value: Scalars['String']['output'];
    /** The product option value ID. */
    valueEntityId: Scalars['Int']['output'];
};

/** Cart selected checkbox option input object */
export type CartSelectedCheckboxOptionInput = {
    /** The product option ID. */
    optionEntityId: Scalars['Int']['input'];
    /** The product option value ID. */
    optionValueEntityId: Scalars['Int']['input'];
};

/** Selected date field option. */
export type CartSelectedDateFieldOption = CartSelectedOption & {
    __typename?: 'CartSelectedDateFieldOption';
    /** Date value. */
    date: DateTimeExtended;
    /** The product option ID. */
    entityId: Scalars['Int']['output'];
    /** The product option name. */
    name: Scalars['String']['output'];
};

/** Cart selected date field option input object */
export type CartSelectedDateFieldOptionInput = {
    /** Date value. */
    date: Scalars['DateTime']['input'];
    /** The product option ID. */
    optionEntityId: Scalars['Int']['input'];
};

/** Selected file upload option. */
export type CartSelectedFileUploadOption = CartSelectedOption & {
    __typename?: 'CartSelectedFileUploadOption';
    /** The product option ID. */
    entityId: Scalars['Int']['output'];
    /** Uploaded file name. */
    fileName: Scalars['String']['output'];
    /** The product option name. */
    name: Scalars['String']['output'];
};

/** Selected multi-line text field option. */
export type CartSelectedMultiLineTextFieldOption = CartSelectedOption & {
    __typename?: 'CartSelectedMultiLineTextFieldOption';
    /** The product option ID. */
    entityId: Scalars['Int']['output'];
    /** The product option name. */
    name: Scalars['String']['output'];
    /** Text value. */
    text: Scalars['String']['output'];
};

/** Cart selected multiple line text field option input object */
export type CartSelectedMultiLineTextFieldOptionInput = {
    /** The product option ID. */
    optionEntityId: Scalars['Int']['input'];
    /** Text value. */
    text: Scalars['String']['input'];
};

/** Selected multiple choice option. */
export type CartSelectedMultipleChoiceOption = CartSelectedOption & {
    __typename?: 'CartSelectedMultipleChoiceOption';
    /** The product option ID. */
    entityId: Scalars['Int']['output'];
    /** The product option name. */
    name: Scalars['String']['output'];
    /** The product option value. */
    value: Scalars['String']['output'];
    /** The product option value ID. */
    valueEntityId: Scalars['Int']['output'];
};

/** Cart selected multiple choice option input object */
export type CartSelectedMultipleChoiceOptionInput = {
    /** The product option ID. */
    optionEntityId: Scalars['Int']['input'];
    /** The product option value ID. */
    optionValueEntityId: Scalars['Int']['input'];
};

/** Selected number field option. */
export type CartSelectedNumberFieldOption = CartSelectedOption & {
    __typename?: 'CartSelectedNumberFieldOption';
    /** The product option ID. */
    entityId: Scalars['Int']['output'];
    /** The product option name. */
    name: Scalars['String']['output'];
    /** Number value. */
    number: Scalars['Float']['output'];
};

/** Cart selected number field option input object */
export type CartSelectedNumberFieldOptionInput = {
    /** Number value. */
    number: Scalars['Float']['input'];
    /** The product option ID. */
    optionEntityId: Scalars['Int']['input'];
};

/** Selected option for the item. */
export type CartSelectedOption = {
    /** The product option ID. */
    entityId: Scalars['Int']['output'];
    /** The product option name. */
    name: Scalars['String']['output'];
};

/** Selected product options. */
export type CartSelectedOptionsInput = {
    /** List of selected checkbox options. */
    checkboxes?: InputMaybe<Array<CartSelectedCheckboxOptionInput>>;
    /** List of selected date field options. */
    dateFields?: InputMaybe<Array<CartSelectedDateFieldOptionInput>>;
    /** List of selected multi-line text field options. */
    multiLineTextFields?: InputMaybe<Array<CartSelectedMultiLineTextFieldOptionInput>>;
    /** List of selected multiple choice options. */
    multipleChoices?: InputMaybe<Array<CartSelectedMultipleChoiceOptionInput>>;
    /** List of selected number field options. */
    numberFields?: InputMaybe<Array<CartSelectedNumberFieldOptionInput>>;
    /** List of selected text field options. */
    textFields?: InputMaybe<Array<CartSelectedTextFieldOptionInput>>;
};

/** Selected text field option. */
export type CartSelectedTextFieldOption = CartSelectedOption & {
    __typename?: 'CartSelectedTextFieldOption';
    /** The product option ID. */
    entityId: Scalars['Int']['output'];
    /** The product option name. */
    name: Scalars['String']['output'];
    /** Text value. */
    text: Scalars['String']['output'];
};

/** Cart selected multiple line text field option input object */
export type CartSelectedTextFieldOptionInput = {
    /** The product option ID. */
    optionEntityId: Scalars['Int']['input'];
    /** TODO */
    text: Scalars['String']['input'];
};

/** Storefront catalog settings. */
export type Catalog = {
    __typename?: 'Catalog';
    /** Product comparisons enabled. */
    productComparisonsEnabled?: Maybe<Scalars['Boolean']['output']>;
};

/** Catalog mutations  */
export type CatalogMutations = {
    __typename?: 'CatalogMutations';
    /** Add a product review. */
    addProductReview: AddProductReviewResult;
};

/** Catalog mutations  */
export type CatalogMutationsAddProductReviewArgs = {
    input: AddProductReviewInput;
    reCaptchaV2?: InputMaybe<ReCaptchaV2Input>;
};

/** Product Option */
export type CatalogProductOption = {
    /** Display name for the option. */
    displayName: Scalars['String']['output'];
    /** Unique ID for the option. */
    entityId: Scalars['Int']['output'];
    /** One of the option values is required to be selected for the checkout. */
    isRequired: Scalars['Boolean']['output'];
    /** Indicates whether it is a variant option or modifier. */
    isVariantOption: Scalars['Boolean']['output'];
};

/** Product Option Value */
export type CatalogProductOptionValue = {
    /** Unique ID for the option value. */
    entityId: Scalars['Int']['output'];
    /** Indicates whether this value is the chosen default selected value. */
    isDefault: Scalars['Boolean']['output'];
    /** Indicates whether this value is selected based on sku/variantEntityId/optionValueIds overlay requested on the product node level. */
    isSelected?: Maybe<Scalars['Boolean']['output']>;
    /** Label for the option value. */
    label: Scalars['String']['output'];
};

/** Category */
export type Category = Node & {
    __typename?: 'Category';
    /** Category breadcrumbs. */
    breadcrumbs: BreadcrumbConnection;
    /** Default image for the category. */
    defaultImage?: Maybe<Image>;
    /** Category default product sort. */
    defaultProductSort?: Maybe<CategoryProductSort>;
    /** Category description. */
    description: Scalars['String']['output'];
    /** Unique ID for the category. */
    entityId: Scalars['Int']['output'];
    /** The ID of an object */
    id: Scalars['ID']['output'];
    /** Metafield data related to a category. */
    metafields: MetafieldConnection;
    /** Category name. */
    name: Scalars['String']['output'];
    /** Category path. */
    path: Scalars['String']['output'];
    /** List of products associated with category */
    products: ProductConnection;
    /** Category SEO details. */
    seo: SeoDetails;
    /**
     * Category shop by price money ranges.
     * @deprecated Alpha version. Do not use in production.
     */
    shopByPriceRanges: ShopByPriceConnection;
};

/** Category */
export type CategoryBreadcrumbsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    depth: Scalars['Int']['input'];
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** Category */
export type CategoryMetafieldsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    keys?: InputMaybe<Array<Scalars['String']['input']>>;
    last?: InputMaybe<Scalars['Int']['input']>;
    namespace: Scalars['String']['input'];
};

/** Category */
export type CategoryProductsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    hideOutOfStock?: InputMaybe<Scalars['Boolean']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
    sortBy?: InputMaybe<CategoryProductSort>;
};

/** Category */
export type CategoryShopByPriceRangesArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    currencyCode?: InputMaybe<CurrencyCode>;
    first?: InputMaybe<Scalars['Int']['input']>;
    includeTax?: InputMaybe<Scalars['Boolean']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of items. */
export type CategoryConnection = {
    __typename?: 'CategoryConnection';
    /** A list of edges. */
    edges?: Maybe<Array<CategoryEdge>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};

/** An edge in a connection. */
export type CategoryEdge = {
    __typename?: 'CategoryEdge';
    /** A cursor for use in pagination. */
    cursor: Scalars['String']['output'];
    /** The item at the end of the edge. */
    node: Category;
};

/** A connection to a list of items. */
export type CategoryPageBannerConnection = {
    __typename?: 'CategoryPageBannerConnection';
    /** A list of edges. */
    edges?: Maybe<Array<CategoryPageBannerEdge>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};

/** An edge in a connection. */
export type CategoryPageBannerEdge = {
    __typename?: 'CategoryPageBannerEdge';
    /** A cursor for use in pagination. */
    cursor: Scalars['String']['output'];
    /** The item at the end of the edge. */
    node: Banner;
};

/** Product sorting by categories. */
export enum CategoryProductSort {
    AToZ = 'A_TO_Z',
    BestReviewed = 'BEST_REVIEWED',
    BestSelling = 'BEST_SELLING',
    Default = 'DEFAULT',
    Featured = 'FEATURED',
    HighestPrice = 'HIGHEST_PRICE',
    LowestPrice = 'LOWEST_PRICE',
    Newest = 'NEWEST',
    ZToA = 'Z_TO_A',
}

/** Redirect to a category. */
export type CategoryRedirect = {
    __typename?: 'CategoryRedirect';
    /** Entity id. */
    entityId: Scalars['Int']['output'];
    /** The ID of an object. */
    id: Scalars['ID']['output'];
    /** Relative destination url. */
    path: Scalars['String']['output'];
};

/** Category Filter */
export type CategorySearchFilter = SearchProductFilter & {
    __typename?: 'CategorySearchFilter';
    /** List of available categories. */
    categories: CategorySearchFilterItemConnection;
    /** Indicates whether to display product count next to the filter. */
    displayProductCount: Scalars['Boolean']['output'];
    /** Indicates whether filter is collapsed by default. */
    isCollapsedByDefault: Scalars['Boolean']['output'];
    /** Display name for the filter. */
    name: Scalars['String']['output'];
};

/** Category Filter */
export type CategorySearchFilterCategoriesArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** Specific category filter item */
export type CategorySearchFilterItem = {
    __typename?: 'CategorySearchFilterItem';
    /** Category ID. */
    entityId: Scalars['Int']['output'];
    /** Indicates whether category is selected. */
    isSelected: Scalars['Boolean']['output'];
    /** Category name. */
    name: Scalars['String']['output'];
    /** Indicates how many products available for this filter. */
    productCount: Scalars['Int']['output'];
    /** List of available sub-categories. */
    subCategories: SubCategorySearchFilterItemConnection;
};

/** Specific category filter item */
export type CategorySearchFilterItemSubCategoriesArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of items. */
export type CategorySearchFilterItemConnection = {
    __typename?: 'CategorySearchFilterItemConnection';
    /** A list of edges. */
    edges?: Maybe<Array<CategorySearchFilterItemEdge>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};

/** An edge in a connection. */
export type CategorySearchFilterItemEdge = {
    __typename?: 'CategorySearchFilterItemEdge';
    /** A cursor for use in pagination. */
    cursor: Scalars['String']['output'];
    /** The item at the end of the edge. */
    node: CategorySearchFilterItem;
};

/** An item in a tree of categories. */
export type CategoryTreeItem = {
    __typename?: 'CategoryTreeItem';
    /** Subcategories of this category */
    children: Array<CategoryTreeItem>;
    /** The description of this category. */
    description: Scalars['String']['output'];
    /** The id category. */
    entityId: Scalars['Int']['output'];
    /** If a category has children. */
    hasChildren: Scalars['Boolean']['output'];
    /** The category image. */
    image?: Maybe<Image>;
    /** The name of category. */
    name: Scalars['String']['output'];
    /** Path assigned to this category */
    path: Scalars['String']['output'];
    /** The number of products in this category. */
    productCount: Scalars['Int']['output'];
};

/** An error that occurred while changing a password. */
export type ChangePasswordError =
    | CustomerDoesNotExistError
    | CustomerNotLoggedInError
    | CustomerPasswordError
    | ValidationError;

/** The input for changing a customer password. */
export type ChangePasswordInput = {
    /** The current password. Do not pass this directly in the query, use GraphQL variables. */
    currentPassword: Scalars['String']['input'];
    /** The new password. Do not pass this directly in the query, use GraphQL variables. */
    newPassword: Scalars['String']['input'];
};

/** The result of changing a password. */
export type ChangePasswordResult = {
    __typename?: 'ChangePasswordResult';
    /** Errors encountered while changing the password. */
    errors: Array<ChangePasswordError>;
};

/** The Channel */
export type Channel = {
    __typename?: 'Channel';
    /** The ID of the channel. */
    entityId: Scalars['Long']['output'];
    /** Metafield data related to a channel. */
    metafields: MetafieldConnection;
};

/** The Channel */
export type ChannelMetafieldsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    keys?: InputMaybe<Array<Scalars['String']['input']>>;
    last?: InputMaybe<Scalars['Int']['input']>;
    namespace: Scalars['String']['input'];
};

/** A simple yes/no question represented by a checkbox. */
export type CheckboxOption = CatalogProductOption & {
    __typename?: 'CheckboxOption';
    /** Indicates the default checked status. */
    checkedByDefault: Scalars['Boolean']['output'];
    /** Option value entity ID used for specifying the checkbox is checked. */
    checkedOptionValueEntityId: Scalars['Int']['output'];
    /** Display name for the option. */
    displayName: Scalars['String']['output'];
    /** Unique ID for the option. */
    entityId: Scalars['Int']['output'];
    /** One of the option values is required to be selected for the checkout. */
    isRequired: Scalars['Boolean']['output'];
    /** Indicates whether it is a variant option or modifier. */
    isVariantOption: Scalars['Boolean']['output'];
    /** Label of the checkbox option. */
    label: Scalars['String']['output'];
    /** Option value entity ID used for specifying the checkbox is not checked. */
    uncheckedOptionValueEntityId: Scalars['Int']['output'];
};

/** Checkboxes form field. */
export type CheckboxesFormField = FormField & {
    __typename?: 'CheckboxesFormField';
    /** The entity ID of the form field. */
    entityId: Scalars['Int']['output'];
    /** Indicates whether the form field is built-in. */
    isBuiltIn: Scalars['Boolean']['output'];
    /** Indicates whether the form field is required. */
    isRequired: Scalars['Boolean']['output'];
    /** The label to display for the form field. */
    label: Scalars['String']['output'];
    /** The options for the form field. */
    options: Array<FormFieldOption>;
    /** The sort order priority of the form field. */
    sortOrder: Scalars['Int']['output'];
};

/** The user input for checkbox form fields. */
export type CheckboxesFormFieldInput = {
    /** The custom form field ID. */
    fieldEntityId: Scalars['Int']['input'];
    /** The choice indexes of the form field values. */
    fieldValueEntityIds: Array<Scalars['Int']['input']>;
};

/** Checkboxes custom form field result. */
export type CheckboxesFormFieldValue = CustomerFormFieldValue & {
    __typename?: 'CheckboxesFormFieldValue';
    /** Entity ID of a custom form field value on a customer or customer address. */
    entityId: Scalars['Int']['output'];
    /** The name of the form field that the value is for. */
    name: Scalars['String']['output'];
    /** List of checkbox value ids selected by customer. */
    valueEntityIds: Array<Scalars['Int']['output']>;
    /** List of checkbox values selected by customer. */
    values: Array<Scalars['String']['output']>;
};

/** The checkout. */
export type Checkout = Node & {
    __typename?: 'Checkout';
    /** Billing address information. */
    billingAddress?: Maybe<CheckoutBillingAddress>;
    /** Cart associated with the checkout. */
    cart?: Maybe<Cart>;
    /** Coupons applied at checkout level. */
    coupons: Array<CheckoutCoupon>;
    /** Time when the checkout was created. */
    createdAt: DateTimeExtended;
    /** Shopper's message provided as details for the order to be created from the checkout. */
    customerMessage?: Maybe<Scalars['String']['output']>;
    /** Checkout ID. */
    entityId: Scalars['String']['output'];
    /** Gift wrapping cost for all items, including or excluding tax. */
    giftWrappingCostTotal?: Maybe<Money>;
    /** The total payable amount, before applying any store credit or gift certificate. */
    grandTotal?: Maybe<Money>;
    /** Handling cost for all consignments including or excluding tax. */
    handlingCostTotal?: Maybe<Money>;
    /** The ID of an object */
    id: Scalars['ID']['output'];
    /** Order associated with the checkout. */
    order?: Maybe<Order>;
    /** GrandTotal subtract the store-credit amount. */
    outstandingBalance?: Maybe<Money>;
    /** List of promotions */
    promotions: Array<CheckoutPromotion>;
    /** List of shipping consignments. */
    shippingConsignments?: Maybe<Array<CheckoutShippingConsignment>>;
    /** Total shipping cost before any discounts are applied. */
    shippingCostTotal?: Maybe<Money>;
    /** Subtotal of the checkout before applying item-level discounts. Tax inclusive based on the store settings. */
    subtotal?: Maybe<Money>;
    /** Total amount of taxes applied. */
    taxTotal?: Maybe<Money>;
    /** List of taxes applied. */
    taxes?: Maybe<Array<CheckoutTax>>;
    /** Time when the checkout was last updated. */
    updatedAt: DateTimeExtended;
    /** The current version of the checkout, which is updated with every change. */
    version?: Maybe<Scalars['Int']['output']>;
};

/** Checkout address. */
export type CheckoutAddress = {
    /** Address line 1. */
    address1?: Maybe<Scalars['String']['output']>;
    /** Address line 2. */
    address2?: Maybe<Scalars['String']['output']>;
    /** Name of the city. */
    city?: Maybe<Scalars['String']['output']>;
    /** Company name. */
    company?: Maybe<Scalars['String']['output']>;
    /** Country code. */
    countryCode: Scalars['String']['output'];
    /** List of custom fields. */
    customFields: Array<CheckoutAddressCustomField>;
    /** Email address. */
    email?: Maybe<Scalars['String']['output']>;
    /** The first name. */
    firstName?: Maybe<Scalars['String']['output']>;
    /** The last name. */
    lastName?: Maybe<Scalars['String']['output']>;
    /** Phone number. */
    phone?: Maybe<Scalars['String']['output']>;
    /** Postal code. */
    postalCode?: Maybe<Scalars['String']['output']>;
    /** State or province. */
    stateOrProvince?: Maybe<Scalars['String']['output']>;
    /** Code of the state or province. */
    stateOrProvinceCode?: Maybe<Scalars['String']['output']>;
};

/** Checkboxes custom field. */
export type CheckoutAddressCheckboxesCustomField = CheckoutAddressCustomField & {
    __typename?: 'CheckoutAddressCheckboxesCustomField';
    /** Custom field ID. */
    entityId: Scalars['Int']['output'];
    /** List of custom field value IDs. */
    valueEntityIds: Array<Scalars['Int']['output']>;
};

/** Checkout address checkboxes custom field input object */
export type CheckoutAddressCheckboxesCustomFieldInput = {
    /** The custom field ID. */
    fieldEntityId: Scalars['Int']['input'];
    /** The choice indexes of the form field values. */
    fieldValueEntityIds: Array<Scalars['Int']['input']>;
};

/** Custom field of the checkout address. */
export type CheckoutAddressCustomField = {
    /** Custom field ID. */
    entityId: Scalars['Int']['output'];
};

/** Checkout address custom field input object */
export type CheckoutAddressCustomFieldInput = {
    /** List of checkboxes custom fields. */
    checkboxes?: InputMaybe<Array<CheckoutAddressCheckboxesCustomFieldInput>>;
    /** List of date custom fields. */
    dates?: InputMaybe<Array<CheckoutAddressDateCustomFieldInput>>;
    /** List of multiple choice custom fields. */
    multipleChoices?: InputMaybe<Array<CheckoutAddressMultipleChoiceCustomFieldInput>>;
    /** List of number custom fields. */
    numbers?: InputMaybe<Array<CheckoutAddressNumberCustomFieldInput>>;
    /** List of password custom fields. */
    passwords?: InputMaybe<Array<CheckoutAddressPasswordCustomFieldInput>>;
    /** List of text custom fields. */
    texts?: InputMaybe<Array<CheckoutAddressTextCustomFieldInput>>;
};

/** Date custom field. */
export type CheckoutAddressDateCustomField = CheckoutAddressCustomField & {
    __typename?: 'CheckoutAddressDateCustomField';
    /** Date value. */
    date: DateTimeExtended;
    /** Custom field ID. */
    entityId: Scalars['Int']['output'];
};

/** Checkout address date custom field input object */
export type CheckoutAddressDateCustomFieldInput = {
    /** Date value. */
    date: Scalars['DateTime']['input'];
    /** The custom field ID. */
    fieldEntityId: Scalars['Int']['input'];
};

/** Checkout address input object */
export type CheckoutAddressInput = {
    /** Address line 1 */
    address1?: InputMaybe<Scalars['String']['input']>;
    /** Address line 2 */
    address2?: InputMaybe<Scalars['String']['input']>;
    /** Name of the city */
    city?: InputMaybe<Scalars['String']['input']>;
    /** Company name */
    company?: InputMaybe<Scalars['String']['input']>;
    /** Country code */
    countryCode: Scalars['String']['input'];
    /** List of custom fields */
    customFields?: InputMaybe<CheckoutAddressCustomFieldInput>;
    /** Email address */
    email?: InputMaybe<Scalars['String']['input']>;
    /** The first name */
    firstName?: InputMaybe<Scalars['String']['input']>;
    /** The last name */
    lastName?: InputMaybe<Scalars['String']['input']>;
    /** Phone number */
    phone?: InputMaybe<Scalars['String']['input']>;
    /** Postal code */
    postalCode?: InputMaybe<Scalars['String']['input']>;
    /** Should we save this address? */
    shouldSaveAddress: Scalars['Boolean']['input'];
    /** State or province */
    stateOrProvince?: InputMaybe<Scalars['String']['input']>;
    /** Code of the state or province */
    stateOrProvinceCode?: InputMaybe<Scalars['String']['input']>;
};

/** Multiple choice custom field. */
export type CheckoutAddressMultipleChoiceCustomField = CheckoutAddressCustomField & {
    __typename?: 'CheckoutAddressMultipleChoiceCustomField';
    /** Custom field ID. */
    entityId: Scalars['Int']['output'];
    /** Custom field value ID. */
    valueEntityId: Scalars['Int']['output'];
};

/** Checkout address multiple choice custom field input object */
export type CheckoutAddressMultipleChoiceCustomFieldInput = {
    /** The custom field ID. */
    fieldEntityId: Scalars['Int']['input'];
    /** The choice index of the form field value. */
    fieldValueEntityId: Scalars['Int']['input'];
};

/** Number custom field. */
export type CheckoutAddressNumberCustomField = CheckoutAddressCustomField & {
    __typename?: 'CheckoutAddressNumberCustomField';
    /** Custom field ID. */
    entityId: Scalars['Int']['output'];
    /** Number value. */
    number: Scalars['Float']['output'];
};

/** Checkout address number custom field input object */
export type CheckoutAddressNumberCustomFieldInput = {
    /** The custom field ID. */
    fieldEntityId: Scalars['Int']['input'];
    /** Number value. */
    number: Scalars['Float']['input'];
};

/** Password custom field. */
export type CheckoutAddressPasswordCustomField = CheckoutAddressCustomField & {
    __typename?: 'CheckoutAddressPasswordCustomField';
    /** Custom field ID. */
    entityId: Scalars['Int']['output'];
    /** Password value. */
    password: Scalars['String']['output'];
};

/** Checkout address password custom field input object */
export type CheckoutAddressPasswordCustomFieldInput = {
    /** The custom field ID. */
    fieldEntityId: Scalars['Int']['input'];
    /** Password value. */
    password: Scalars['String']['input'];
};

/** Checkout address text custom field input object */
export type CheckoutAddressTextCustomFieldInput = {
    /** The custom field ID. */
    fieldEntityId: Scalars['Int']['input'];
    /** Text value. */
    text: Scalars['String']['input'];
};

/** Text custom field. */
export type CheckoutAddressTextFieldCustomField = CheckoutAddressCustomField & {
    __typename?: 'CheckoutAddressTextFieldCustomField';
    /** Custom field ID. */
    entityId: Scalars['Int']['output'];
    /** Text value. */
    text: Scalars['String']['output'];
};

/** Available shipping option. */
export type CheckoutAvailableShippingOption = {
    __typename?: 'CheckoutAvailableShippingOption';
    /** Shipping option cost. */
    cost: Money;
    /** Shipping option description. */
    description: Scalars['String']['output'];
    /** Shipping option ID. */
    entityId: Scalars['String']['output'];
    /** Shipping option image. */
    image?: Maybe<Image>;
    /**
     * Shipping option image URL.
     * @deprecated Use `image` field instead.
     */
    imageUrl?: Maybe<Scalars['String']['output']>;
    /** Is this shipping method the recommended shipping option or not. */
    isRecommended: Scalars['Boolean']['output'];
    /** An estimate of the arrival time. */
    transitTime?: Maybe<Scalars['String']['output']>;
    /** Shipping option type. Flat rate, UPS, etc. */
    type: Scalars['String']['output'];
};

/** Checkboxes billing address. */
export type CheckoutBillingAddress = CheckoutAddress & {
    __typename?: 'CheckoutBillingAddress';
    /** Address line 1. */
    address1?: Maybe<Scalars['String']['output']>;
    /** Address line 2. */
    address2?: Maybe<Scalars['String']['output']>;
    /** Name of the city. */
    city?: Maybe<Scalars['String']['output']>;
    /** Company name. */
    company?: Maybe<Scalars['String']['output']>;
    /** Country code. */
    countryCode: Scalars['String']['output'];
    /** List of custom fields. */
    customFields: Array<CheckoutAddressCustomField>;
    /** Email address. */
    email?: Maybe<Scalars['String']['output']>;
    /** Billing address ID. */
    entityId: Scalars['String']['output'];
    /** The first name. */
    firstName?: Maybe<Scalars['String']['output']>;
    /** The last name. */
    lastName?: Maybe<Scalars['String']['output']>;
    /** Phone number. */
    phone?: Maybe<Scalars['String']['output']>;
    /** Postal code. */
    postalCode?: Maybe<Scalars['String']['output']>;
    /** State or province. */
    stateOrProvince?: Maybe<Scalars['String']['output']>;
    /** Code of the state or province. */
    stateOrProvinceCode?: Maybe<Scalars['String']['output']>;
};

/** Checkboxes consignment address. */
export type CheckoutConsignmentAddress = CheckoutAddress & {
    __typename?: 'CheckoutConsignmentAddress';
    /** Address line 1. */
    address1?: Maybe<Scalars['String']['output']>;
    /** Address line 2. */
    address2?: Maybe<Scalars['String']['output']>;
    /** Name of the city. */
    city?: Maybe<Scalars['String']['output']>;
    /** Company name. */
    company?: Maybe<Scalars['String']['output']>;
    /** Country code. */
    countryCode: Scalars['String']['output'];
    /** List of custom fields. */
    customFields: Array<CheckoutAddressCustomField>;
    /** Email address. */
    email?: Maybe<Scalars['String']['output']>;
    /** The first name. */
    firstName?: Maybe<Scalars['String']['output']>;
    /** The last name. */
    lastName?: Maybe<Scalars['String']['output']>;
    /** Phone number. */
    phone?: Maybe<Scalars['String']['output']>;
    /** Postal code. */
    postalCode?: Maybe<Scalars['String']['output']>;
    /** State or province. */
    stateOrProvince?: Maybe<Scalars['String']['output']>;
    /** Code of the state or province. */
    stateOrProvinceCode?: Maybe<Scalars['String']['output']>;
};

/** Checkout consignment line item input object */
export type CheckoutConsignmentLineItemInput = {
    /** The line item id */
    lineItemEntityId: Scalars['String']['input'];
    /** The total number of consignment line items */
    quantity: Scalars['Int']['input'];
};

/** The checkout coupon. */
export type CheckoutCoupon = {
    __typename?: 'CheckoutCoupon';
    /** The coupon code. */
    code: Scalars['String']['output'];
    /** The coupon type. */
    couponType?: Maybe<CouponType>;
    /** The discounted amount applied within a given context. */
    discountedAmount: Money;
    /** The coupon ID. */
    entityId: Scalars['Int']['output'];
};

/** Checkout mutations */
export type CheckoutMutations = {
    __typename?: 'CheckoutMutations';
    /** Creates a checkout billing address. */
    addCheckoutBillingAddress?: Maybe<AddCheckoutBillingAddressResult>;
    /** Creates a checkout shipping consignments. */
    addCheckoutShippingConsignments?: Maybe<AddCheckoutShippingConsignmentsResult>;
    /** Applies a checkout coupon. */
    applyCheckoutCoupon?: Maybe<ApplyCheckoutCouponResult>;
    /** Applies a checkout spam protection. */
    applyCheckoutSpamProtection?: Maybe<ApplyCheckoutSpamProtectionResult>;
    /** Completes the checkout. */
    completeCheckout?: Maybe<CompleteCheckoutResult>;
    /** Deletes a checkout consignment. */
    deleteCheckoutConsignment?: Maybe<DeleteCheckoutConsignmentResult>;
    /** Selects a checkout shipping option. */
    selectCheckoutShippingOption?: Maybe<SelectCheckoutShippingOptionResult>;
    /** Unapply a checkout coupon. */
    unapplyCheckoutCoupon?: Maybe<UnapplyCheckoutCouponResult>;
    /** Update a checkout billing address. */
    updateCheckoutBillingAddress?: Maybe<UpdateCheckoutBillingAddressResult>;
    /** Updates a checkout customer message. */
    updateCheckoutCustomerMessage?: Maybe<UpdateCheckoutCustomerMessageResult>;
    /** Updates a checkout shipping consignments. */
    updateCheckoutShippingConsignment?: Maybe<UpdateCheckoutShippingConsignmentResult>;
};

/** Checkout mutations */
export type CheckoutMutationsAddCheckoutBillingAddressArgs = {
    input: AddCheckoutBillingAddressInput;
};

/** Checkout mutations */
export type CheckoutMutationsAddCheckoutShippingConsignmentsArgs = {
    input: AddCheckoutShippingConsignmentsInput;
};

/** Checkout mutations */
export type CheckoutMutationsApplyCheckoutCouponArgs = {
    input: ApplyCheckoutCouponInput;
};

/** Checkout mutations */
export type CheckoutMutationsApplyCheckoutSpamProtectionArgs = {
    input: ApplyCheckoutSpamProtectionInput;
};

/** Checkout mutations */
export type CheckoutMutationsCompleteCheckoutArgs = {
    input: CompleteCheckoutInput;
};

/** Checkout mutations */
export type CheckoutMutationsDeleteCheckoutConsignmentArgs = {
    input: DeleteCheckoutConsignmentInput;
};

/** Checkout mutations */
export type CheckoutMutationsSelectCheckoutShippingOptionArgs = {
    input: SelectCheckoutShippingOptionInput;
};

/** Checkout mutations */
export type CheckoutMutationsUnapplyCheckoutCouponArgs = {
    input: UnapplyCheckoutCouponInput;
};

/** Checkout mutations */
export type CheckoutMutationsUpdateCheckoutBillingAddressArgs = {
    input: UpdateCheckoutBillingAddressInput;
};

/** Checkout mutations */
export type CheckoutMutationsUpdateCheckoutCustomerMessageArgs = {
    input: UpdateCheckoutCustomerMessageInput;
};

/** Checkout mutations */
export type CheckoutMutationsUpdateCheckoutShippingConsignmentArgs = {
    input: UpdateCheckoutShippingConsignmentInput;
};

/** The checkout promotion */
export type CheckoutPromotion = {
    __typename?: 'CheckoutPromotion';
    /** The checkout promotion banners. */
    banners: Array<CheckoutPromotionBanner>;
};

/** The checkout promotion banner */
export type CheckoutPromotionBanner = {
    __typename?: 'CheckoutPromotionBanner';
    /** The checkout promotion banner ID. */
    entityId: Scalars['Int']['output'];
    /** The list of the locations where the banner will display. */
    locations: Array<CheckoutPromotionBannerLocation>;
    /** Text of the banner. */
    text: Scalars['String']['output'];
    /** Type of the banner. */
    type: CheckoutPromotionBannerType;
};

/** Checkout promotion banner location. */
export enum CheckoutPromotionBannerLocation {
    CartPage = 'CART_PAGE',
    CheckoutPage = 'CHECKOUT_PAGE',
    HomePage = 'HOME_PAGE',
    ProductPage = 'PRODUCT_PAGE',
}

/** Checkout promotion banner type. */
export enum CheckoutPromotionBannerType {
    Applied = 'APPLIED',
    Eligible = 'ELIGIBLE',
    Promotion = 'PROMOTION',
    Upsell = 'UPSELL',
}

/** Selected shipping option. */
export type CheckoutSelectedShippingOption = {
    __typename?: 'CheckoutSelectedShippingOption';
    /** Shipping option cost. */
    cost: Money;
    /** Shipping option description. */
    description: Scalars['String']['output'];
    /** Shipping option ID. */
    entityId: Scalars['String']['output'];
    /** Shipping option image. */
    image?: Maybe<Image>;
    /**
     * Shipping option image URL.
     * @deprecated Use `image` field instead.
     */
    imageUrl?: Maybe<Scalars['String']['output']>;
    /** An estimate of the arrival time. */
    transitTime?: Maybe<Scalars['String']['output']>;
    /** Shipping option type. Flat rate, UPS, etc. */
    type: Scalars['String']['output'];
};

/** Checkout settings. */
export type CheckoutSettings = {
    __typename?: 'CheckoutSettings';
    /** Indicates whether ReCaptcha is enabled on checkout. */
    reCaptchaEnabled: Scalars['Boolean']['output'];
};

/** Checkout shipping consignment. */
export type CheckoutShippingConsignment = {
    __typename?: 'CheckoutShippingConsignment';
    /** Shipping consignment address. */
    address: CheckoutConsignmentAddress;
    /** List of available shipping options. */
    availableShippingOptions?: Maybe<Array<CheckoutAvailableShippingOption>>;
    /** List of coupons applied to this shipping consignment. */
    coupons?: Maybe<Array<CheckoutCoupon>>;
    /** Shipping consignment ID. */
    entityId: Scalars['String']['output'];
    /** The handling cost of shipping for the consignment. */
    handlingCost?: Maybe<Money>;
    /** List of line item IDs for the consignment. */
    lineItemIds: Array<Scalars['String']['output']>;
    /** Selected shipping option. */
    selectedShippingOption?: Maybe<CheckoutSelectedShippingOption>;
    /** The shipping cost for the consignment. */
    shippingCost?: Maybe<Money>;
};

/** Checkout shipping consignments input object */
export type CheckoutShippingConsignmentInput = {
    /** Shipping consignment address. */
    address: CheckoutAddressInput;
    /** List of line items for the consignment. */
    lineItems: Array<CheckoutConsignmentLineItemInput>;
};

/** The checkout. */
export type CheckoutTax = {
    __typename?: 'CheckoutTax';
    /** Tax amount. */
    amount: Money;
    /** Name of the tax. */
    name: Scalars['String']['output'];
};

/** Additional information about the collection. */
export type CollectionInfo = {
    __typename?: 'CollectionInfo';
    /** Total items in the collection despite pagination. */
    totalItems?: Maybe<Scalars['Long']['output']>;
};

/** Complete checkout input object */
export type CompleteCheckoutInput = {
    /** The checkout id */
    checkoutEntityId: Scalars['String']['input'];
};

/** Complete checkout result */
export type CompleteCheckoutResult = {
    __typename?: 'CompleteCheckoutResult';
    /** The Order ID created as a result of the checkout. */
    orderEntityId?: Maybe<Scalars['Int']['output']>;
    /** The access token to be used to complete a payment. */
    paymentAccessToken?: Maybe<Scalars['String']['output']>;
};

/** Contact field */
export type ContactField = {
    __typename?: 'ContactField';
    /** Store address line. */
    address: Scalars['String']['output'];
    /** Store address type. */
    addressType: Scalars['String']['output'];
    /** Store country. */
    country: Scalars['String']['output'];
    /** Store email. */
    email: Scalars['String']['output'];
    /** Store phone number. */
    phone: Scalars['String']['output'];
};

/** A contact page. */
export type ContactPage = Node &
    WebPage & {
        __typename?: 'ContactPage';
        /** The contact fields that should be used on the page. */
        contactFields: Array<Scalars['String']['output']>;
        /** Unique ID for the web page. */
        entityId: Scalars['Int']['output'];
        /** The body of the page. */
        htmlBody: Scalars['String']['output'];
        /** The ID of an object */
        id: Scalars['ID']['output'];
        /** Whether or not the page should be visible in the navigation menu. */
        isVisibleInNavigation: Scalars['Boolean']['output'];
        /** Page name. */
        name: Scalars['String']['output'];
        /** Unique ID for the parent page. */
        parentEntityId?: Maybe<Scalars['Int']['output']>;
        /** The URL path of the page. */
        path: Scalars['String']['output'];
        /** The plain text summary of the page body. */
        plainTextSummary: Scalars['String']['output'];
        /** The rendered regions for the web page. */
        renderedRegions: RenderedRegionsByPageType;
        /** Page SEO details. */
        seo: SeoDetails;
    };

/** A contact page. */
export type ContactPagePlainTextSummaryArgs = {
    characterLimit?: InputMaybe<Scalars['Int']['input']>;
};

/** The page content. */
export type Content = {
    __typename?: 'Content';
    /** Banners details. */
    banners?: Maybe<Banners>;
    /** Blog details. */
    blog?: Maybe<Blog>;
    /** Page details. */
    page?: Maybe<WebPage>;
    /** Details of the pages. */
    pages: PageConnection;
    /** The rendered regions by specific page. */
    renderedRegionsByPageType: RenderedRegionsByPageType;
    /** The rendered regions by specific page and id. */
    renderedRegionsByPageTypeAndEntityId: RenderedRegionsByPageType;
};

/** The page content. */
export type ContentPageArgs = {
    entityId: Scalars['Int']['input'];
};

/** The page content. */
export type ContentPagesArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    filters?: InputMaybe<WebPagesFiltersInput>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** The page content. */
export type ContentRenderedRegionsByPageTypeArgs = {
    pageType: PageType;
};

/** The page content. */
export type ContentRenderedRegionsByPageTypeAndEntityIdArgs = {
    entityId: Scalars['Long']['input'];
    entityPageType: EntityPageType;
};

/** A country representation. */
export type Country = {
    __typename?: 'Country';
    /** The 2-letter ISO Alpha-2 code for a country. */
    code: Scalars['String']['output'];
    /** A country's ID. */
    entityId: Scalars['Int']['output'];
    /** A country's name. */
    name: Scalars['String']['output'];
    /** A country's states or provinces. */
    statesOrProvinces: Array<StateOrProvince>;
};

/** An input parameter to narrow down the countries you receive based on country name and code. */
export type CountryFiltersInput = {
    /** The 2-letter ISO Alpha-2 code for a country that you can use to filter results. */
    code?: InputMaybe<Scalars['String']['input']>;
    /** The name of a country that you can use to filter results. */
    name?: InputMaybe<Scalars['String']['input']>;
};

/** The coupon type. */
export enum CouponType {
    FreeShipping = 'FREE_SHIPPING',
    PercentageDiscount = 'PERCENTAGE_DISCOUNT',
    PerItemDiscount = 'PER_ITEM_DISCOUNT',
    PerTotalDiscount = 'PER_TOTAL_DISCOUNT',
    Promotion = 'PROMOTION',
    ShippingDiscount = 'SHIPPING_DISCOUNT',
}

/** Create cart input object */
export type CreateCartInput = {
    /** ISO-4217 currency code */
    currencyCode?: InputMaybe<Scalars['String']['input']>;
    /** List of gift certificates */
    giftCertificates?: InputMaybe<Array<CartGiftCertificateInput>>;
    /** List of cart line items */
    lineItems?: InputMaybe<Array<CartLineItemInput>>;
    /** Locale of the cart */
    locale?: InputMaybe<Scalars['String']['input']>;
};

/** Create cart's metafield data. */
export type CreateCartMetafieldDataInput = {
    /** Key for cart metafield. */
    key: Scalars['String']['input'];
    /** Value for cart metafield. */
    value: Scalars['String']['input'];
};

/** Error that occured as a result of createCartMetafieldMutation. */
export type CreateCartMetafieldError = AlreadyExistsError | LimitExceededError | NotFoundError | ValidationError;

/** Input for create cart's metafield. */
export type CreateCartMetafieldInput = {
    /** Cart id for which to create metafield. */
    cartEntityId: Scalars['String']['input'];
    /** Create cart's metafield data. */
    data: CreateCartMetafieldDataInput;
};

/** Result of creating metafield for cart. */
export type CreateCartMetafieldResult = {
    __typename?: 'CreateCartMetafieldResult';
    /** Errors found during creation of cart's metafield. */
    errors: Array<CreateCartMetafieldError>;
    /** Metafield created for cart. */
    metafield?: Maybe<Metafields>;
};

/** Error that occurs as a result of createCartRedirectUrlsMutation. */
export type CreateCartRedirectUrlsError = NotFoundError;

/** Create cart redirect URLs input object. */
export type CreateCartRedirectUrlsInput = {
    /** The cart id to create the redirect URLs for. */
    cartEntityId?: InputMaybe<Scalars['String']['input']>;
    /** The query parameters to pass when redirecting to the URLs. */
    queryParams?: InputMaybe<Array<CreateCartRedirectUrlsQueryParamsInput>>;
};

/** Create cart redirect URLs query params input object. */
export type CreateCartRedirectUrlsQueryParamsInput = {
    /** The key of the query parameter to pass. */
    key: Scalars['String']['input'];
    /** The value of the query parameter to pass. */
    value: Scalars['String']['input'];
};

/** Create cart redirect URLs result */
export type CreateCartRedirectUrlsResult = {
    __typename?: 'CreateCartRedirectUrlsResult';
    /** Errors found during creation of cart redirect URLs. */
    errors: Array<CreateCartRedirectUrlsError>;
    /** The redirect URLs created as a result of the mutation. */
    redirectUrls?: Maybe<CartRedirectUrls>;
};

/** Create cart result */
export type CreateCartResult = {
    __typename?: 'CreateCartResult';
    /** The Cart that is created as a result of mutation. */
    cart?: Maybe<Cart>;
};

/** Create wishlist input object */
export type CreateWishlistInput = {
    /** A wishlist visibility mode */
    isPublic: Scalars['Boolean']['input'];
    /** A wishlist items */
    items?: InputMaybe<Array<WishlistItemInput>>;
    /** A wishlist name */
    name: Scalars['String']['input'];
};

/** Create wishlist */
export type CreateWishlistResult = {
    __typename?: 'CreateWishlistResult';
    /** The newly created wishlist */
    result: Wishlist;
};

/** Details of the credit card payment instrument. */
export type CreditCardPaymentInstrument = {
    __typename?: 'CreditCardPaymentInstrument';
    /** Credit card brand. */
    brand: Scalars['String']['output'];
    /** Last four digits of the credit card number. */
    last4: Scalars['String']['output'];
};

/** Currency details. */
export type Currency = {
    __typename?: 'Currency';
    /** Currency code. */
    code: CurrencyCode;
    /** Currency display settings. */
    display: CurrencyDisplay;
    /** Currency ID. */
    entityId: Scalars['Int']['output'];
    /** Exchange rate relative to default currency. */
    exchangeRate: Scalars['Float']['output'];
    /** Flag image URL. */
    flagImage?: Maybe<Scalars['String']['output']>;
    /** Indicates whether this currency is active. */
    isActive: Scalars['Boolean']['output'];
    /** Indicates whether this currency is transactional. */
    isTransactional: Scalars['Boolean']['output'];
    /** Currency name. */
    name: Scalars['String']['output'];
};

/** A connection to a list of items. */
export type CurrencyConnection = {
    __typename?: 'CurrencyConnection';
    /** A list of edges. */
    edges?: Maybe<Array<CurrencyEdge>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};

/** Currency display settings. */
export type CurrencyDisplay = {
    __typename?: 'CurrencyDisplay';
    /** Currency decimal places. */
    decimalPlaces: Scalars['Int']['output'];
    /** Currency decimal token. */
    decimalToken: Scalars['String']['output'];
    /** Currency symbol. */
    symbol: Scalars['String']['output'];
    /** Currency symbol. */
    symbolPlacement: CurrencySymbolPosition;
    /** Currency thousands token. */
    thousandsToken: Scalars['String']['output'];
};

/** An edge in a connection. */
export type CurrencyEdge = {
    __typename?: 'CurrencyEdge';
    /** A cursor for use in pagination. */
    cursor: Scalars['String']['output'];
    /** The item at the end of the edge. */
    node: Currency;
};

/** Currency symbol position */
export enum CurrencySymbolPosition {
    Left = 'LEFT',
    Right = 'RIGHT',
}

/** Custom field */
export type CustomField = {
    __typename?: 'CustomField';
    /** Custom field ID. */
    entityId: Scalars['Int']['output'];
    /** Name of the custom field. */
    name: Scalars['String']['output'];
    /** Value of the custom field. */
    value: Scalars['String']['output'];
};

/** A connection to a list of items for custom fields. */
export type CustomFieldConnection = {
    __typename?: 'CustomFieldConnection';
    /** A list of edges. */
    edges?: Maybe<Array<CustomFieldEdge>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};

/** An edge in a connection. */
export type CustomFieldEdge = {
    __typename?: 'CustomFieldEdge';
    /** A cursor for use in pagination. */
    cursor: Scalars['String']['output'];
    /** The item at the end of the edge. */
    node: CustomField;
};

/** A customer that shops on a store */
export type Customer = {
    __typename?: 'Customer';
    /**
     * Customer addresses count.
     * @deprecated Use addresses.collectionInfo.totalItems instead.
     */
    addressCount: Scalars['Int']['output'];
    /** Customer addresses. */
    addresses: AddressConnection;
    /** Customer attributes count. */
    attributeCount: Scalars['Int']['output'];
    /** Customer attributes. */
    attributes: CustomerAttributes;
    /** The company name of the customer. */
    company: Scalars['String']['output'];
    /** The customer group id of the customer. */
    customerGroupId: Scalars['Int']['output'];
    /** The email address of the customer. */
    email: Scalars['String']['output'];
    /** The ID of the customer. */
    entityId: Scalars['Int']['output'];
    /** The first name of the customer. */
    firstName: Scalars['String']['output'];
    /** The form field values of the customer. */
    formFields: Array<CustomerFormFieldValue>;
    /** The last name of the customer. */
    lastName: Scalars['String']['output'];
    /** Metafield data related to a customer. */
    metafields: MetafieldConnection;
    /**
     * The notes of the customer.
     * @deprecated Notes aren't supported in Storefront GQL API. This will output an empty string.
     */
    notes: Scalars['String']['output'];
    /** The phone number of the customer. */
    phone: Scalars['String']['output'];
    /** Customer store credit. */
    storeCredit: Array<Money>;
    /** The tax exempt category of the customer. */
    taxExemptCategory: Scalars['String']['output'];
    /** Customer wishlists. */
    wishlists: WishlistConnection;
};

/** A customer that shops on a store */
export type CustomerAddressesArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** A customer that shops on a store */
export type CustomerMetafieldsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    keys?: InputMaybe<Array<Scalars['String']['input']>>;
    last?: InputMaybe<Scalars['Int']['input']>;
    namespace: Scalars['String']['input'];
};

/** A customer that shops on a store */
export type CustomerWishlistsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    filters?: InputMaybe<WishlistFiltersInput>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** The customer token. */
export type CustomerAccessToken = {
    __typename?: 'CustomerAccessToken';
    /** The customer token expiration time. */
    expiresAt: Scalars['DateTime']['output'];
    /** The customer token value. */
    value: Scalars['String']['output'];
};

/** Address that is associated with a customer account. */
export type CustomerAddress = {
    __typename?: 'CustomerAddress';
    /** First line for the street address. */
    address1: Scalars['String']['output'];
    /** Second line for the street address. */
    address2?: Maybe<Scalars['String']['output']>;
    /** City. */
    city: Scalars['String']['output'];
    /** Company name associated with the address. */
    company?: Maybe<Scalars['String']['output']>;
    /** 2-letter country code. */
    countryCode: Scalars['String']['output'];
    /** Customer address ID. */
    entityId: Scalars['Int']['output'];
    /** First name of the address owner. */
    firstName: Scalars['String']['output'];
    /** The form field values of the customer address. */
    formFields: Array<CustomerFormFieldValue>;
    /** Last name of the address owner. */
    lastName: Scalars['String']['output'];
    /** Phone number. */
    phone?: Maybe<Scalars['String']['output']>;
    /** Postal code. */
    postalCode?: Maybe<Scalars['String']['output']>;
    /** Name of State or Province. */
    stateOrProvince?: Maybe<Scalars['String']['output']>;
};

/** Unexpected error while creating a customer address. */
export type CustomerAddressCreationError = Error & {
    __typename?: 'CustomerAddressCreationError';
    /** Error message. */
    message: Scalars['String']['output'];
};

/** Unexpected error while deleting a customer address. */
export type CustomerAddressDeletionError = Error & {
    __typename?: 'CustomerAddressDeletionError';
    /** Error message. */
    message: Scalars['String']['output'];
};

/** An unexpected error while updating an address for a customer. */
export type CustomerAddressUpdateError = Error & {
    __typename?: 'CustomerAddressUpdateError';
    /** Error message. */
    message: Scalars['String']['output'];
};

/** An error resulting from a customer submitting multiple reviews to the same product. */
export type CustomerAlreadyReviewedProductError = Error & {
    __typename?: 'CustomerAlreadyReviewedProductError';
    /** Error message. */
    message: Scalars['String']['output'];
};

/** A custom, store-specific attribute for a customer */
export type CustomerAttribute = {
    __typename?: 'CustomerAttribute';
    /** The ID of the custom customer attribute */
    entityId: Scalars['Int']['output'];
    /** The name of the custom customer attribute */
    name: Scalars['String']['output'];
    /** The value of the custom customer attribute */
    value?: Maybe<Scalars['String']['output']>;
};

/** Custom, store-specific customer attributes */
export type CustomerAttributes = {
    __typename?: 'CustomerAttributes';
    /** A custom, store-specific attribute for a customer */
    attribute: CustomerAttribute;
};

/** Custom, store-specific customer attributes */
export type CustomerAttributesAttributeArgs = {
    entityId: Scalars['Int']['input'];
};

/** An error due to customer not existing when attempting to update customer information. */
export type CustomerDoesNotExistError = Error & {
    __typename?: 'CustomerDoesNotExistError';
    /** Error message. */
    message: Scalars['String']['output'];
};

/** Custom form field value as submitted by customer. */
export type CustomerFormFieldValue = {
    /** Entity ID of a custom form field value on a customer or customer address. */
    entityId: Scalars['Int']['output'];
    /** The name of the form field that the value is for. */
    name: Scalars['String']['output'];
};

/** The input for the filled out customer form fields. */
export type CustomerFormFieldsInput = {
    /** List of checkboxes custom form fields input. */
    checkboxes?: InputMaybe<Array<CheckboxesFormFieldInput>>;
    /** List of date custom form fields input. */
    dates?: InputMaybe<Array<DateFormFieldInput>>;
    /** List of multiline text custom form fields input. */
    multilineTexts?: InputMaybe<Array<MultilineTextFormFieldInput>>;
    /** List of multiple choice custom form fields input. This includes pick lists. */
    multipleChoices?: InputMaybe<Array<MultipleChoiceFormFieldInput>>;
    /** List of number custom form fields input. */
    numbers?: InputMaybe<Array<NumberFormFieldInput>>;
    /** List of password custom form fields input. */
    passwords?: InputMaybe<Array<PasswordFormFieldInput>>;
    /** List of text custom form fields input. */
    texts?: InputMaybe<Array<TextFormFieldInput>>;
};

/** Mutations for customers domain. */
export type CustomerMutations = {
    __typename?: 'CustomerMutations';
    /** Submit a customer address. */
    addCustomerAddress: AddCustomerAddressResult;
    /** Change the password for a customer. */
    changePassword: ChangePasswordResult;
    /** Delete a customer address. */
    deleteCustomerAddress: DeleteCustomerAddressResult;
    /** Register a new customer. */
    registerCustomer: RegisterCustomerResult;
    /** Request reset password email. */
    requestResetPassword: RequestResetPasswordResult;
    /** Reset customer password */
    resetPassword: ResetPasswordResult;
    /** Update a customer. */
    updateCustomer: UpdateCustomerResult;
    /** Update a customer address. */
    updateCustomerAddress: UpdateCustomerAddressResult;
};

/** Mutations for customers domain. */
export type CustomerMutationsAddCustomerAddressArgs = {
    input: AddCustomerAddressInput;
    reCaptchaV2?: InputMaybe<ReCaptchaV2Input>;
};

/** Mutations for customers domain. */
export type CustomerMutationsChangePasswordArgs = {
    input: ChangePasswordInput;
};

/** Mutations for customers domain. */
export type CustomerMutationsDeleteCustomerAddressArgs = {
    input: DeleteCustomerAddressInput;
    reCaptchaV2?: InputMaybe<ReCaptchaV2Input>;
};

/** Mutations for customers domain. */
export type CustomerMutationsRegisterCustomerArgs = {
    input: RegisterCustomerInput;
    reCaptchaV2?: InputMaybe<ReCaptchaV2Input>;
};

/** Mutations for customers domain. */
export type CustomerMutationsRequestResetPasswordArgs = {
    input: RequestResetPasswordInput;
    reCaptchaV2?: InputMaybe<ReCaptchaV2Input>;
};

/** Mutations for customers domain. */
export type CustomerMutationsResetPasswordArgs = {
    input: ResetPasswordInput;
};

/** Mutations for customers domain. */
export type CustomerMutationsUpdateCustomerArgs = {
    input: UpdateCustomerInput;
    reCaptchaV2?: InputMaybe<ReCaptchaV2Input>;
};

/** Mutations for customers domain. */
export type CustomerMutationsUpdateCustomerAddressArgs = {
    input: UpdateCustomerAddressInput;
    reCaptchaV2?: InputMaybe<ReCaptchaV2Input>;
};

/** An error due to not supplying a customer ID either via customer-id header (when using a customer impersonation token) or by logging into the storefront as a customer. */
export type CustomerNotLoggedInError = Error & {
    __typename?: 'CustomerNotLoggedInError';
    /** Error message. */
    message: Scalars['String']['output'];
};

/** An error that occurred when a customer password is being changed or reset. */
export type CustomerPasswordError = Error & {
    __typename?: 'CustomerPasswordError';
    /** Details of the error. */
    message: Scalars['String']['output'];
};

/** An unexpected error while registering a customer. */
export type CustomerRegistrationError = Error & {
    __typename?: 'CustomerRegistrationError';
    /** A description of the error. */
    message: Scalars['String']['output'];
};

/** Customers settings. */
export type CustomersSettings = {
    __typename?: 'CustomersSettings';
    /** Settings that determine the minimum complexity required for a customer's password. */
    passwordComplexitySettings?: Maybe<PasswordComplexitySettings>;
};

/** A calendar for allowing selection of a date. */
export type DateFieldOption = CatalogProductOption & {
    __typename?: 'DateFieldOption';
    /** The default timestamp of date option. */
    defaultValue?: Maybe<Scalars['DateTime']['output']>;
    /** Display name for the option. */
    displayName: Scalars['String']['output'];
    /** The earliest timestamp of date option. */
    earliest?: Maybe<Scalars['DateTime']['output']>;
    /** Unique ID for the option. */
    entityId: Scalars['Int']['output'];
    /** One of the option values is required to be selected for the checkout. */
    isRequired: Scalars['Boolean']['output'];
    /** Indicates whether it is a variant option or modifier. */
    isVariantOption: Scalars['Boolean']['output'];
    /** The latest timestamp of date option. */
    latest?: Maybe<Scalars['DateTime']['output']>;
    /** Limit date by */
    limitDateBy: LimitDateOption;
};

/** Date form field. */
export type DateFormField = FormField & {
    __typename?: 'DateFormField';
    /** The default date value for the form field. */
    defaultDate?: Maybe<Scalars['DateTime']['output']>;
    /** The entity ID of the form field. */
    entityId: Scalars['Int']['output'];
    /** Indicates whether the form field is built-in. */
    isBuiltIn: Scalars['Boolean']['output'];
    /** Indicates whether the form field is required. */
    isRequired: Scalars['Boolean']['output'];
    /** The label to display for the form field. */
    label: Scalars['String']['output'];
    /** The latest date that can be selected for the form field. */
    maxDate?: Maybe<Scalars['DateTime']['output']>;
    /** The earliest date that can be selected for the form field. */
    minDate?: Maybe<Scalars['DateTime']['output']>;
    /** The sort order priority of the form field. */
    sortOrder: Scalars['Int']['output'];
};

/** The user input for date form fields. */
export type DateFormFieldInput = {
    /** The user date input for the form field in ISO-8601 format. */
    date: Scalars['DateTime']['input'];
    /** The custom form field ID. */
    fieldEntityId: Scalars['Int']['input'];
};

/** Date custom form field value. */
export type DateFormFieldValue = CustomerFormFieldValue & {
    __typename?: 'DateFormFieldValue';
    /** The date submitted by a customer. */
    date: DateTimeExtended;
    /** Entity ID of a custom form field value on a customer or customer address. */
    entityId: Scalars['Int']['output'];
    /** The name of the form field that the value is for. */
    name: Scalars['String']['output'];
};

/** Date Time Extended */
export type DateTimeExtended = {
    __typename?: 'DateTimeExtended';
    /** ISO-8601 formatted date in UTC. (e.g. 2024-01-01T00:00:00Z) */
    utc: Scalars['DateTime']['output'];
};

/** Delete cart input object */
export type DeleteCartInput = {
    /** The cart id */
    cartEntityId: Scalars['String']['input'];
};

/** Delete cart line item input object */
export type DeleteCartLineItemInput = {
    /** The cart id */
    cartEntityId: Scalars['String']['input'];
    /** The line item id */
    lineItemEntityId: Scalars['String']['input'];
    /** Version number. When provided, will reject the request if the version number is not the latest version of the cart, in order to prevent race conditions. */
    version?: InputMaybe<Scalars['Int']['input']>;
};

/** Delete cart lien item result */
export type DeleteCartLineItemResult = {
    __typename?: 'DeleteCartLineItemResult';
    /** The Cart that is updated as a result of mutation. */
    cart?: Maybe<Cart>;
    /** The ID of the Cart if it is deleted as a result of mutation. */
    deletedCartEntityId?: Maybe<Scalars['String']['output']>;
    /** The ID of the line item that is deleted as a result of mutation. */
    deletedLineItemEntityId?: Maybe<Scalars['String']['output']>;
};

/** Error that occured as a result of deleteCartMetafield mutation. */
export type DeleteCartMetafieldError = NotAuthorisedError | NotFoundError | ValidationError;

/** Input for delete cart's metafield mutation. */
export type DeleteCartMetafieldInput = {
    /** Id of the cart for which to delete metafield. */
    cartEntityId: Scalars['String']['input'];
    /** Id of metafield to delete. */
    metafieldEntityId: Scalars['Int']['input'];
};

/** Result of deleting metafield for cart. */
export type DeleteCartMetafieldResult = {
    __typename?: 'DeleteCartMetafieldResult';
    /** Id of metafield deleted for cart. */
    deletedMetafieldEntityId?: Maybe<Scalars['Int']['output']>;
    /** Errors found during deletion of cart's metafield. */
    errors: Array<DeleteCartMetafieldError>;
};

/** Delete cart result */
export type DeleteCartResult = {
    __typename?: 'DeleteCartResult';
    /** The ID of the Cart that is deleted as a result of mutation. */
    deletedCartEntityId?: Maybe<Scalars['String']['output']>;
};

/** Delete checkout consignment input object */
export type DeleteCheckoutConsignmentInput = {
    /** The checkout id */
    checkoutEntityId: Scalars['String']['input'];
    /** The consignment id */
    consignmentEntityId: Scalars['String']['input'];
    /** Version number. When provided, will reject the request if the version number is not the latest version of the cart, in order to prevent race conditions. */
    version?: InputMaybe<Scalars['Int']['input']>;
};

/** Delete checkout consignment result */
export type DeleteCheckoutConsignmentResult = {
    __typename?: 'DeleteCheckoutConsignmentResult';
    /** The Checkout that is updated as a result of mutation. */
    checkout?: Maybe<Checkout>;
};

/** Possible response errors when attempting to delete a customer address. */
export type DeleteCustomerAddressError = CustomerAddressDeletionError | CustomerNotLoggedInError;

/** Input for deleting a customer address. */
export type DeleteCustomerAddressInput = {
    /** Address entity ID for the customer address to delete. */
    addressEntityId: Scalars['Int']['input'];
};

/** Result of DeleteCustomerAddress mutation. */
export type DeleteCustomerAddressResult = {
    __typename?: 'DeleteCustomerAddressResult';
    /** Response errors that occurred while attempting to delete a customer address. */
    errors: Array<DeleteCustomerAddressError>;
};

/** Delete wishlist items input object */
export type DeleteWishlistItemsInput = {
    /** The wishlist id */
    entityId: Scalars['Int']['input'];
    /** The wishlist item ids */
    itemEntityIds: Array<Scalars['Int']['input']>;
};

/** Delete wishlist items */
export type DeleteWishlistItemsResult = {
    __typename?: 'DeleteWishlistItemsResult';
    /** The wishlist */
    result: Wishlist;
};

/** Delete wishlist */
export type DeleteWishlistResult = {
    __typename?: 'DeleteWishlistResult';
    /** The result of the operation */
    result: Scalars['String']['output'];
};

/** Delete wishlists input object */
export type DeleteWishlistsInput = {
    /** The wishlist ids */
    entityIds: Array<Scalars['Int']['input']>;
};

/** Display field */
export type DisplayField = {
    __typename?: 'DisplayField';
    /** Extended date format. */
    extendedDateFormat: Scalars['String']['output'];
    /** Short date format. */
    shortDateFormat: Scalars['String']['output'];
};

/** Distance */
export type Distance = {
    __typename?: 'Distance';
    /** Length unit */
    lengthUnit: LengthUnit;
    /** Distance in specified length unit */
    value: Scalars['Float']['output'];
};

/** Filter locations by the distance */
export type DistanceFilter = {
    /** Signed decimal degrees without compass direction */
    latitude: Scalars['Float']['input'];
    /** Length unit */
    lengthUnit: LengthUnit;
    /** Signed decimal degrees without compass direction */
    longitude: Scalars['Float']['input'];
    /** Radius of search in length units specified in lengthUnit argument */
    radius: Scalars['Float']['input'];
};

/** An error due to the customer email already being in use when attempting registration. */
export type EmailAlreadyInUseError = Error & {
    __typename?: 'EmailAlreadyInUseError';
    /** A description of the error. */
    message: Scalars['String']['output'];
};

/** Entity page type */
export enum EntityPageType {
    BlogPost = 'BLOG_POST',
    Brand = 'BRAND',
    Category = 'CATEGORY',
    ContactUs = 'CONTACT_US',
    Page = 'PAGE',
    Product = 'PRODUCT',
}

/** An error object, indicating what went wrong with a mutation. */
export type Error = {
    /** A description of the error */
    message: Scalars['String']['output'];
};

/** An external link page. */
export type ExternalLinkPage = WebPage & {
    __typename?: 'ExternalLinkPage';
    /** Unique ID for the web page. */
    entityId: Scalars['Int']['output'];
    /** Whether or not the page should be visible in the navigation menu. */
    isVisibleInNavigation: Scalars['Boolean']['output'];
    /** The URL that the page links to. */
    link: Scalars['String']['output'];
    /** Page name. */
    name: Scalars['String']['output'];
    /** Unique ID for the parent page. */
    parentEntityId?: Maybe<Scalars['Int']['output']>;
    /** Page SEO details. */
    seo: SeoDetails;
};

/** A form allowing selection and uploading of a file from the user's local computer. */
export type FileUploadFieldOption = CatalogProductOption & {
    __typename?: 'FileUploadFieldOption';
    /** Display name for the option. */
    displayName: Scalars['String']['output'];
    /** Unique ID for the option. */
    entityId: Scalars['Int']['output'];
    /** All possible file extensions. Empty means that all files allowed. */
    fileTypes: Array<Scalars['String']['output']>;
    /** One of the option values is required to be selected for the checkout. */
    isRequired: Scalars['Boolean']['output'];
    /** Indicates whether it is a variant option or modifier. */
    isVariantOption: Scalars['Boolean']['output'];
    /** The maximum size of the file in kilobytes */
    maxFileSize: Scalars['Int']['output'];
};

/** The details of a form field. */
export type FormField = {
    /** The entity ID of the form field. */
    entityId: Scalars['Int']['output'];
    /** Indicates whether the form field is built-in. */
    isBuiltIn: Scalars['Boolean']['output'];
    /** Indicates whether the form field is required. */
    isRequired: Scalars['Boolean']['output'];
    /** The label to display for the form field. */
    label: Scalars['String']['output'];
    /** The sort order priority of the form field. */
    sortOrder: Scalars['Int']['output'];
};

/** Object containing filters for querying form fields. */
export type FormFieldFiltersInput = {
    /** Filter by form field entity IDs. */
    entityIds?: InputMaybe<Array<Scalars['Int']['input']>>;
    /** Filter by built-in form fields. */
    isBuiltIn?: InputMaybe<Scalars['Boolean']['input']>;
    /** Filter by required form fields. */
    isRequired?: InputMaybe<Scalars['Boolean']['input']>;
};

/** The details of an option for a checkbox or multiple choice form field. */
export type FormFieldOption = {
    __typename?: 'FormFieldOption';
    /** The entity ID of the form field option. */
    entityId: Scalars['Int']['output'];
    /** The label to display for the form field option. */
    label: Scalars['String']['output'];
};

/** The sorting to use on form field results. */
export enum FormFieldSortInput {
    FieldId = 'FIELD_ID',
    SortOrder = 'SORT_ORDER',
}

/** The types of form fields that can be queried. */
export type FormFields = {
    __typename?: 'FormFields';
    /** The billing address form fields. */
    billingAddress: Array<FormField>;
    /** The customer form fields. */
    customer: Array<FormField>;
    /** The shipping address form fields. */
    shippingAddress: Array<FormField>;
};

/** The types of form fields that can be queried. */
export type FormFieldsBillingAddressArgs = {
    filters?: InputMaybe<FormFieldFiltersInput>;
    sortBy?: InputMaybe<FormFieldSortInput>;
};

/** The types of form fields that can be queried. */
export type FormFieldsCustomerArgs = {
    filters?: InputMaybe<FormFieldFiltersInput>;
    sortBy?: InputMaybe<FormFieldSortInput>;
};

/** The types of form fields that can be queried. */
export type FormFieldsShippingAddressArgs = {
    filters?: InputMaybe<FormFieldFiltersInput>;
    sortBy?: InputMaybe<FormFieldSortInput>;
};

/** Geography information. */
export type Geography = {
    __typename?: 'Geography';
    /** A list of available countries. */
    countries?: Maybe<Array<Country>>;
};

/** Geography information. */
export type GeographyCountriesArgs = {
    filters?: InputMaybe<CountryFiltersInput>;
};

/** The details of a gift certificate payment instrument. */
export type GiftCertificatePaymentInstrument = {
    __typename?: 'GiftCertificatePaymentInstrument';
    /** The gift certificate code. */
    code: Scalars['String']['output'];
};

/** Gift wrapping for product */
export type GiftWrapping = {
    __typename?: 'GiftWrapping';
    /** Indicates whether commenting is allowed for the gift wrapping. */
    allowComments: Scalars['Boolean']['output'];
    /** Gift wrapping id. */
    entityId: Scalars['Int']['output'];
    /** Gift wrapping name. */
    name: Scalars['String']['output'];
    /** Gift wrapping preview image url. */
    previewImageUrl?: Maybe<Scalars['String']['output']>;
};

/** A connection to a list of items. */
export type GiftWrappingConnection = {
    __typename?: 'GiftWrappingConnection';
    /** A list of edges. */
    edges?: Maybe<Array<GiftWrappingEdge>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};

/** An edge in a connection. */
export type GiftWrappingEdge = {
    __typename?: 'GiftWrappingEdge';
    /** A cursor for use in pagination. */
    cursor: Scalars['String']['output'];
    /** The item at the end of the edge. */
    node: GiftWrapping;
};

/** Image */
export type Image = {
    __typename?: 'Image';
    /** Text description of an image that can be used for SEO and/or accessibility purposes. */
    altText: Scalars['String']['output'];
    /** Indicates whether this is the primary image. */
    isDefault: Scalars['Boolean']['output'];
    /** Absolute path to image using store CDN. */
    url: Scalars['String']['output'];
    /** Absolute path to original image using store CDN. */
    urlOriginal: Scalars['String']['output'];
    /** A templatized URL containing a {:size} parameter which can be replaced with a string specifying the desired image size in either inherent width (123w) or width and height (123x123). */
    urlTemplate: Scalars['String']['output'];
};

/** Image */
export type ImageUrlArgs = {
    height?: InputMaybe<Scalars['Int']['input']>;
    lossy?: InputMaybe<Scalars['Boolean']['input']>;
    width: Scalars['Int']['input'];
};

/** Image */
export type ImageUrlOriginalArgs = {
    lossy?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Image */
export type ImageUrlTemplateArgs = {
    lossy?: InputMaybe<Scalars['Boolean']['input']>;
};

/** A connection to a list of items. */
export type ImageConnection = {
    __typename?: 'ImageConnection';
    /** A list of edges. */
    edges?: Maybe<Array<ImageEdge>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ImageEdge = {
    __typename?: 'ImageEdge';
    /** A cursor for use in pagination. */
    cursor: Scalars['String']['output'];
    /** The item at the end of the edge. */
    node: Image;
};

/** Validation errors dealing with input parameters supplied to an rpc call. */
export type InvalidInputFieldsError = Error & {
    __typename?: 'InvalidInputFieldsError';
    /** The input fields that had a validation issue. */
    fields: Array<Scalars['String']['output']>;
    /** Error message. */
    message: Scalars['String']['output'];
};

/** An inventory */
export type Inventory = {
    __typename?: 'Inventory';
    /** Locations */
    locations: InventoryLocationConnection;
};

/** An inventory */
export type InventoryLocationsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    cities?: InputMaybe<Array<Scalars['String']['input']>>;
    codes?: InputMaybe<Array<Scalars['String']['input']>>;
    countryCodes?: InputMaybe<Array<CountryCode>>;
    distanceFilter?: InputMaybe<DistanceFilter>;
    entityIds?: InputMaybe<Array<Scalars['Int']['input']>>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
    serviceTypeIds?: InputMaybe<Array<Scalars['String']['input']>>;
    states?: InputMaybe<Array<Scalars['String']['input']>>;
    typeIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** Address */
export type InventoryAddress = {
    __typename?: 'InventoryAddress';
    /** Address line1. */
    address1: Scalars['String']['output'];
    /** Address line2. */
    address2: Scalars['String']['output'];
    /** Address city. */
    city: Scalars['String']['output'];
    /** Address code. */
    code: Scalars['String']['output'];
    /** Country code. */
    countryCode: Scalars['String']['output'];
    /** Address description. */
    description?: Maybe<Scalars['String']['output']>;
    /** Address email. */
    email: Scalars['String']['output'];
    /** Address id. */
    entityId: Scalars['Int']['output'];
    /** Address label. */
    label: Scalars['String']['output'];
    /** Address latitude. */
    latitude?: Maybe<Scalars['Float']['output']>;
    /** Address longitude. */
    longitude?: Maybe<Scalars['Float']['output']>;
    /** Address phone. */
    phone: Scalars['String']['output'];
    /** Address zip. */
    postalCode: Scalars['String']['output'];
    /** Address state. */
    stateOrProvince: Scalars['String']['output'];
};

/** Inventory By Locations */
export type InventoryByLocations = {
    __typename?: 'InventoryByLocations';
    /** Number of available products in stock. */
    availableToSell: Scalars['Long']['output'];
    /** Indicates whether this product is in stock. */
    isInStock: Scalars['Boolean']['output'];
    /** Distance between location and specified longitude and latitude */
    locationDistance?: Maybe<Distance>;
    /** Location code. */
    locationEntityCode: Scalars['String']['output'];
    /** Location id. */
    locationEntityId: Scalars['Long']['output'];
    /**
     * Location service type ids.
     * @deprecated Deprecated. Will be substituted with pickup methods.
     */
    locationEntityServiceTypeIds: Array<Scalars['String']['output']>;
    /** Location type id. */
    locationEntityTypeId?: Maybe<Scalars['String']['output']>;
    /** Indicates a threshold low-stock level. */
    warningLevel: Scalars['Int']['output'];
};

/** Location */
export type InventoryLocation = {
    __typename?: 'InventoryLocation';
    /** Location address */
    address?: Maybe<InventoryAddress>;
    /**
     * Upcoming events
     * @deprecated Deprecated. Use specialHours instead
     */
    blackoutHours: Array<SpecialHour>;
    /** Location code. */
    code: Scalars['String']['output'];
    /** Location description. */
    description?: Maybe<Scalars['String']['output']>;
    /** Distance between location and specified longitude and latitude */
    distance?: Maybe<Distance>;
    /** Location id. */
    entityId: Scalars['Int']['output'];
    /** Location label. */
    label: Scalars['String']['output'];
    /** Metafield data related to a location. */
    metafields: MetafieldConnection;
    /** Location OperatingHours */
    operatingHours?: Maybe<OperatingHours>;
    /**
     * Location service type ids.
     * @deprecated Deprecated. Will be substituted with pickup methods.
     */
    serviceTypeIds: Array<Scalars['String']['output']>;
    /** Upcoming events */
    specialHours: Array<SpecialHour>;
    /** Time zone of location */
    timeZone?: Maybe<Scalars['String']['output']>;
    /** Location type id. */
    typeId?: Maybe<Scalars['String']['output']>;
};

/** Location */
export type InventoryLocationMetafieldsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    keys?: InputMaybe<Array<Scalars['String']['input']>>;
    last?: InputMaybe<Scalars['Int']['input']>;
    namespace: Scalars['String']['input'];
};

/** A connection to a list of items. */
export type InventoryLocationConnection = {
    __typename?: 'InventoryLocationConnection';
    /** A list of edges. */
    edges?: Maybe<Array<InventoryLocationEdge>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};

/** An edge in a connection. */
export type InventoryLocationEdge = {
    __typename?: 'InventoryLocationEdge';
    /** A cursor for use in pagination. */
    cursor: Scalars['String']['output'];
    /** The item at the end of the edge. */
    node: InventoryLocation;
};

/** Inventory settings from control panel. */
export type InventorySettings = {
    __typename?: 'InventorySettings';
    /** Out of stock message. */
    defaultOutOfStockMessage: Scalars['String']['output'];
    /** Flag to show or not on product filtering when option is out of stock */
    hideInProductFiltering: Scalars['Boolean']['output'];
    /** The option out of stock behavior. */
    optionOutOfStockBehavior?: Maybe<OptionOutOfStockBehavior>;
    /** The product out of stock behavior. */
    productOutOfStockBehavior?: Maybe<ProductOutOfStockBehavior>;
    /** Show out of stock message on product listing pages */
    showOutOfStockMessage: Scalars['Boolean']['output'];
    /** Show pre-order inventory */
    showPreOrderStockLevels: Scalars['Boolean']['output'];
    /** Hide or show inventory node for product */
    stockLevelDisplay?: Maybe<StockLevelDisplay>;
    /** The behavior to use to update stock levels. */
    updateStockBehavior?: Maybe<UpdateStockBehavior>;
};

/** length unit */
export enum LengthUnit {
    Kilometres = 'Kilometres',
    Miles = 'Miles',
}

/** Limit date by */
export enum LimitDateOption {
    EarliestDate = 'EARLIEST_DATE',
    LatestDate = 'LATEST_DATE',
    NoLimit = 'NO_LIMIT',
    Range = 'RANGE',
}

/** Limit already reached. Can't create more subjects. */
export type LimitExceededError = Error & {
    __typename?: 'LimitExceededError';
    /** Limit boundary. */
    limit: Scalars['Int']['output'];
    /** A description of the error */
    message: Scalars['String']['output'];
};

/** Limit numbers by several options. */
export enum LimitInputBy {
    HighestValue = 'HIGHEST_VALUE',
    LowestValue = 'LOWEST_VALUE',
    NoLimit = 'NO_LIMIT',
    Range = 'RANGE',
}

/** A connection to a list of items. */
export type LocationConnection = {
    __typename?: 'LocationConnection';
    /** A list of edges. */
    edges?: Maybe<Array<LocationEdge>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};

/** An edge in a connection. */
export type LocationEdge = {
    __typename?: 'LocationEdge';
    /** A cursor for use in pagination. */
    cursor: Scalars['String']['output'];
    /** The item at the end of the edge. */
    node: InventoryByLocations;
};

/** Login result. */
export type LoginResult = {
    __typename?: 'LoginResult';
    /** The cart that is assigned to the customer after login. */
    cart?: Maybe<Cart>;
    /** The currently logged in customer. */
    customer?: Maybe<Customer>;
    /** The customer token. */
    customerAccessToken?: Maybe<CustomerAccessToken>;
    /**
     * The result of a login
     * @deprecated Use customer node instead.
     */
    result: Scalars['String']['output'];
};

/** Result of login using customer login JWT. */
export type LoginWithCustomerLoginJwtResult = {
    __typename?: 'LoginWithCustomerLoginJwtResult';
    /** The cart that is assigned to the customer after login. */
    cart?: Maybe<Cart>;
    /** The currently logged in customer. */
    customer?: Maybe<Customer>;
    /** The customer token. */
    customerAccessToken?: Maybe<CustomerAccessToken>;
    /** The URL to redirect to after login. */
    redirectTo: Scalars['String']['output'];
};

/** Logo field */
export type LogoField = {
    __typename?: 'LogoField';
    /** Store logo image. */
    image: Image;
    /** Logo title. */
    title: Scalars['String']['output'];
};

/** Logout result */
export type LogoutResult = {
    __typename?: 'LogoutResult';
    /** The result of a logout */
    result: Scalars['String']['output'];
};

/** Redirect to manually input url. */
export type ManualRedirect = {
    __typename?: 'ManualRedirect';
    /** Url. */
    url: Scalars['String']['output'];
};

/** Measurement */
export type Measurement = {
    __typename?: 'Measurement';
    /** Unit of measurement. */
    unit: Scalars['String']['output'];
    /** Unformatted weight measurement value. */
    value: Scalars['Float']['output'];
};

/** A connection to a list of items. */
export type MetafieldConnection = {
    __typename?: 'MetafieldConnection';
    /** A list of edges. */
    edges?: Maybe<Array<MetafieldEdge>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};

/** An edge in a connection. */
export type MetafieldEdge = {
    __typename?: 'MetafieldEdge';
    /** A cursor for use in pagination. */
    cursor: Scalars['String']['output'];
    /** The item at the end of the edge. */
    node: Metafields;
};

/** Key/Value pairs of data attached tied to a resource entity (product, brand, category, etc.) */
export type Metafields = {
    __typename?: 'Metafields';
    /** The ID of the metafield when referencing via our backend API. */
    entityId: Scalars['Int']['output'];
    /** The ID of metafield. */
    id: Scalars['ID']['output'];
    /** A label for identifying metafield's data value. */
    key: Scalars['String']['output'];
    /** A metafield's value. */
    value: Scalars['String']['output'];
};

/** A money object - includes currency code and a money amount */
export type Money = {
    __typename?: 'Money';
    /** Currency code of the current money. */
    currencyCode: Scalars['String']['output'];
    /**
     * The formatted currency string for the current money.
     * @deprecated Deprecated. Don't use - it will be removed soon.
     */
    formatted?: Maybe<Scalars['String']['output']>;
    /** The amount of money. */
    value: Scalars['BigDecimal']['output'];
};

/** A min and max pair of money objects */
export type MoneyRange = {
    __typename?: 'MoneyRange';
    /** Maximum money object. */
    max: Money;
    /** Minimum money object. */
    min: Money;
};

/** A multi-line text input field, aka a text box. */
export type MultiLineTextFieldOption = CatalogProductOption & {
    __typename?: 'MultiLineTextFieldOption';
    /** Default value of the multiline text field option. */
    defaultValue?: Maybe<Scalars['String']['output']>;
    /** Display name for the option. */
    displayName: Scalars['String']['output'];
    /** Unique ID for the option. */
    entityId: Scalars['Int']['output'];
    /** One of the option values is required to be selected for the checkout. */
    isRequired: Scalars['Boolean']['output'];
    /** Indicates whether it is a variant option or modifier. */
    isVariantOption: Scalars['Boolean']['output'];
    /** The maximum number of characters. */
    maxLength?: Maybe<Scalars['Int']['output']>;
    /** The maximum number of lines. */
    maxLines?: Maybe<Scalars['Int']['output']>;
    /** The minimum number of characters. */
    minLength?: Maybe<Scalars['Int']['output']>;
};

/** Multiline text form field. */
export type MultilineTextFormField = FormField & {
    __typename?: 'MultilineTextFormField';
    /** The default text value for the form field. */
    defaultText?: Maybe<Scalars['String']['output']>;
    /** The entity ID of the form field. */
    entityId: Scalars['Int']['output'];
    /** Indicates whether the form field is built-in. */
    isBuiltIn: Scalars['Boolean']['output'];
    /** Indicates whether the form field is required. */
    isRequired: Scalars['Boolean']['output'];
    /** The label to display for the form field. */
    label: Scalars['String']['output'];
    /** The amount of rows for the form field. */
    rows: Scalars['Int']['output'];
    /** The sort order priority of the form field. */
    sortOrder: Scalars['Int']['output'];
};

/** The user input for multiline text form fields. */
export type MultilineTextFormFieldInput = {
    /** The custom form field ID. */
    fieldEntityId: Scalars['Int']['input'];
    /** Multiline text value. */
    multilineText: Scalars['String']['input'];
};

/** Multiline text custom form field value. */
export type MultilineTextFormFieldValue = CustomerFormFieldValue & {
    __typename?: 'MultilineTextFormFieldValue';
    /** Entity ID of a custom form field value on a customer or customer address. */
    entityId: Scalars['Int']['output'];
    /** The multiline text submitted by a customer. */
    multilineText: Scalars['String']['output'];
    /** The name of the form field that the value is for. */
    name: Scalars['String']['output'];
};

/** The user input for multiple choice form fields. */
export type MultipleChoiceFormFieldInput = {
    /** The custom form field ID. */
    fieldEntityId: Scalars['Int']['input'];
    /** The choice index of the form field value. */
    fieldValueEntityId: Scalars['Int']['input'];
};

/** Multiple choice (includes radio button and pick list) custom form field result. */
export type MultipleChoiceFormFieldValue = CustomerFormFieldValue & {
    __typename?: 'MultipleChoiceFormFieldValue';
    /** Entity ID of a custom form field value on a customer or customer address. */
    entityId: Scalars['Int']['output'];
    /** The name of the form field that the value is for. */
    name: Scalars['String']['output'];
    /** The multiple choice value selected by customer. */
    value: Scalars['String']['output'];
    /** The multiple choice value id selected by customer. */
    valueEntityId: Scalars['Int']['output'];
};

/** An option type that has a fixed list of values. */
export type MultipleChoiceOption = CatalogProductOption & {
    __typename?: 'MultipleChoiceOption';
    /** Display name for the option. */
    displayName: Scalars['String']['output'];
    /** The chosen display style for this multiple choice option. */
    displayStyle: Scalars['String']['output'];
    /** Unique ID for the option. */
    entityId: Scalars['Int']['output'];
    /** One of the option values is required to be selected for the checkout. */
    isRequired: Scalars['Boolean']['output'];
    /** Indicates whether it is a variant option or modifier. */
    isVariantOption: Scalars['Boolean']['output'];
    /** List of option values. */
    values: ProductOptionValueConnection;
};

/** An option type that has a fixed list of values. */
export type MultipleChoiceOptionValuesArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** A simple multiple choice value comprised of an id and a label. */
export type MultipleChoiceOptionValue = CatalogProductOptionValue & {
    __typename?: 'MultipleChoiceOptionValue';
    /** Unique ID for the option value. */
    entityId: Scalars['Int']['output'];
    /** Indicates whether this value is the chosen default selected value. */
    isDefault: Scalars['Boolean']['output'];
    /** Indicates whether this value is selected based on sku/variantEntityId/optionValueIds overlay requested on the product node level. */
    isSelected?: Maybe<Scalars['Boolean']['output']>;
    /** Label for the option value. */
    label: Scalars['String']['output'];
};

export type Mutation = {
    __typename?: 'Mutation';
    /** The Cart mutations. */
    cart: CartMutations;
    /** The catalog mutations. */
    catalog: CatalogMutations;
    /** The Checkout mutations. */
    checkout: CheckoutMutations;
    /** The customer mutations. */
    customer: CustomerMutations;
    /** Customer login. */
    login: LoginResult;
    /** Login with Customer Login JWT. */
    loginWithCustomerLoginJwt: LoginWithCustomerLoginJwtResult;
    /** Customer logout */
    logout: LogoutResult;
    /** Contact us mutation. */
    submitContactUs: SubmitContactUsResult;
    /** The wishlist mutations. */
    wishlist: WishlistMutations;
};

export type MutationLoginArgs = {
    email: Scalars['String']['input'];
    guestCartEntityId?: InputMaybe<Scalars['String']['input']>;
    password: Scalars['String']['input'];
};

export type MutationLoginWithCustomerLoginJwtArgs = {
    guestCartEntityId?: InputMaybe<Scalars['String']['input']>;
    jwt: Scalars['String']['input'];
};

export type MutationSubmitContactUsArgs = {
    input: SubmitContactUsInput;
    reCaptchaV2?: InputMaybe<ReCaptchaV2Input>;
};

/** An object with an ID */
export type Node = {
    /** The id of the object. */
    id: Scalars['ID']['output'];
};

/** A normal page. */
export type NormalPage = Node &
    WebPage & {
        __typename?: 'NormalPage';
        /** Unique ID for the web page. */
        entityId: Scalars['Int']['output'];
        /** The body of the page. */
        htmlBody: Scalars['String']['output'];
        /** The ID of an object */
        id: Scalars['ID']['output'];
        /** Whether or not the page should be visible in the navigation menu. */
        isVisibleInNavigation: Scalars['Boolean']['output'];
        /** Page name. */
        name: Scalars['String']['output'];
        /** Unique ID for the parent page. */
        parentEntityId?: Maybe<Scalars['Int']['output']>;
        /** The URL path of the page. */
        path: Scalars['String']['output'];
        /** The plain text summary of the page body. */
        plainTextSummary: Scalars['String']['output'];
        /** The rendered regions for the web page. */
        renderedRegions: RenderedRegionsByPageType;
        /** Page SEO details. */
        seo: SeoDetails;
    };

/** A normal page. */
export type NormalPagePlainTextSummaryArgs = {
    characterLimit?: InputMaybe<Scalars['Int']['input']>;
};

/** The not authorized to perform operation error. */
export type NotAuthorisedError = Error & {
    __typename?: 'NotAuthorisedError';
    /** A description of the error */
    message: Scalars['String']['output'];
};

/** The not authorized to add product review error. */
export type NotAuthorizedToAddProductReviewError = Error & {
    __typename?: 'NotAuthorizedToAddProductReviewError';
    /** Error message. */
    message: Scalars['String']['output'];
};

/** Subject not found error. */
export type NotFoundError = Error & {
    __typename?: 'NotFoundError';
    /** A description of the error */
    message: Scalars['String']['output'];
};

/** A single line text input field that only accepts numbers. */
export type NumberFieldOption = CatalogProductOption & {
    __typename?: 'NumberFieldOption';
    /** Default value of the text field option. */
    defaultValue?: Maybe<Scalars['Float']['output']>;
    /** Display name for the option. */
    displayName: Scalars['String']['output'];
    /** Unique ID for the option. */
    entityId: Scalars['Int']['output'];
    /** The top limit of possible numbers. */
    highest?: Maybe<Scalars['Float']['output']>;
    /** Allow whole numbers only. */
    isIntegerOnly: Scalars['Boolean']['output'];
    /** One of the option values is required to be selected for the checkout. */
    isRequired: Scalars['Boolean']['output'];
    /** Indicates whether it is a variant option or modifier. */
    isVariantOption: Scalars['Boolean']['output'];
    /** Limit numbers by several options. */
    limitNumberBy: LimitInputBy;
    /** The bottom limit of possible numbers. */
    lowest?: Maybe<Scalars['Float']['output']>;
};

/** Number only form field. */
export type NumberFormField = FormField & {
    __typename?: 'NumberFormField';
    /** The default number value for the form field. */
    defaultNumber?: Maybe<Scalars['Float']['output']>;
    /** The entity ID of the form field. */
    entityId: Scalars['Int']['output'];
    /** Indicates whether the form field is built-in. */
    isBuiltIn: Scalars['Boolean']['output'];
    /** Indicates whether the form field is required. */
    isRequired: Scalars['Boolean']['output'];
    /** The label to display for the form field. */
    label: Scalars['String']['output'];
    /** The maximum amount of characters that can be entered into text form field. */
    maxLength?: Maybe<Scalars['Int']['output']>;
    /** The highest allowed number to be entered in the form field. */
    maxNumber?: Maybe<Scalars['Int']['output']>;
    /** The lowest allowed number to be entered in the form field. */
    minNumber?: Maybe<Scalars['Int']['output']>;
    /** The sort order priority of the form field. */
    sortOrder: Scalars['Int']['output'];
};

/** The user input for number form fields. */
export type NumberFormFieldInput = {
    /** The custom form field ID. */
    fieldEntityId: Scalars['Int']['input'];
    /** The number input of the number field. */
    number: Scalars['Float']['input'];
};

/** Numbers custom form field value. */
export type NumberFormFieldValue = CustomerFormFieldValue & {
    __typename?: 'NumberFormFieldValue';
    /** Entity ID of a custom form field value on a customer or customer address. */
    entityId: Scalars['Int']['output'];
    /** The name of the form field that the value is for. */
    name: Scalars['String']['output'];
    /** The number value submitted by customer. */
    number: Scalars['Float']['output'];
};

/** Operating day */
export type OperatingDay = {
    __typename?: 'OperatingDay';
    /** Closing. */
    closing: Scalars['String']['output'];
    /** Open. */
    open: Scalars['Boolean']['output'];
    /** Opening. */
    opening: Scalars['String']['output'];
};

/** Operating hours */
export type OperatingHours = {
    __typename?: 'OperatingHours';
    /** Friday. */
    friday?: Maybe<OperatingDay>;
    /** Monday. */
    monday?: Maybe<OperatingDay>;
    /** Saturday. */
    saturday?: Maybe<OperatingDay>;
    /** Sunday. */
    sunday?: Maybe<OperatingDay>;
    /** Thursday. */
    thursday?: Maybe<OperatingDay>;
    /** Tuesday. */
    tuesday?: Maybe<OperatingDay>;
    /** Wednesday. */
    wednesday?: Maybe<OperatingDay>;
};

/** A connection to a list of items. */
export type OptionConnection = {
    __typename?: 'OptionConnection';
    /** A list of edges. */
    edges?: Maybe<Array<OptionEdge>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};

/** An edge in a connection. */
export type OptionEdge = {
    __typename?: 'OptionEdge';
    /** A cursor for use in pagination. */
    cursor: Scalars['String']['output'];
    /** The item at the end of the edge. */
    node: ProductOption;
};

/** Behavior of the variant when stock is equal to 0 */
export enum OptionOutOfStockBehavior {
    DoNothing = 'DO_NOTHING',
    HideOption = 'HIDE_OPTION',
    LabelOption = 'LABEL_OPTION',
}

/** A connection to a list of items. */
export type OptionValueConnection = {
    __typename?: 'OptionValueConnection';
    /** A list of edges. */
    edges?: Maybe<Array<OptionValueEdge>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};

/** An edge in a connection. */
export type OptionValueEdge = {
    __typename?: 'OptionValueEdge';
    /** A cursor for use in pagination. */
    cursor: Scalars['String']['output'];
    /** The item at the end of the edge. */
    node: ProductOptionValue;
};

/** A variant option value id input object */
export type OptionValueId = {
    /** A variant option id filter */
    optionEntityId: Scalars['Int']['input'];
    /** A variant value id filter. */
    valueEntityId: Scalars['Int']['input'];
};

/** A node for fetching orders. */
export type Order = BaseOrder &
    Node & {
        __typename?: 'Order';
        /** Billing address. */
        billingAddress: OrderBillingAddress;
        /** Consignments. */
        consignments?: Maybe<OrderConsignments>;
        /** Message from customer */
        customerMessage?: Maybe<Scalars['String']['output']>;
        /** Discounts. */
        discounts: OrderDiscounts;
        /** Order ID. */
        entityId: Scalars['Int']['output'];
        /** Total cost of handling. */
        handlingCostTotal: Money;
        /** The ID of an object. */
        id: Scalars['ID']['output'];
        /** Indicates whether the taxes are included in the order total. */
        isTaxIncluded: Scalars['Boolean']['output'];
        /** Date and time the order was placed. */
        orderedAt: DateTimeExtended;
        /** Total cost of shipping. */
        shippingCostTotal: Money;
        /** Order status. */
        status: OrderStatus;
        /** Subtotal. */
        subTotal: Money;
        /** Total tax. */
        taxTotal: Money;
        /** Taxes. */
        taxes: Array<OrderTax>;
        /** The final order total payable amount inclusive of tax, before applying any store credit or gift certificate. */
        totalIncTax: Money;
        /** Date and time the order was last updated. */
        updatedAt: DateTimeExtended;
        /** Total cost of wrapping. */
        wrappingCostTotal: Money;
    };

/** An address for an order. */
export type OrderAddress = {
    /** Main address line. */
    address1?: Maybe<Scalars['String']['output']>;
    /** Secondary address line. */
    address2?: Maybe<Scalars['String']['output']>;
    /** City. */
    city?: Maybe<Scalars['String']['output']>;
    /** Company. */
    company?: Maybe<Scalars['String']['output']>;
    /** Country. */
    country: Scalars['String']['output'];
    /** Country code. */
    countryCode: Scalars['String']['output'];
    /** Email address. */
    email?: Maybe<Scalars['String']['output']>;
    /** First name. */
    firstName?: Maybe<Scalars['String']['output']>;
    /** Last name. */
    lastName?: Maybe<Scalars['String']['output']>;
    /** Phone number. */
    phone?: Maybe<Scalars['String']['output']>;
    /** Postal code. */
    postalCode: Scalars['String']['output'];
    /** State or province. */
    stateOrProvince?: Maybe<Scalars['String']['output']>;
    /** State or province code. */
    stateOrProvinceCode?: Maybe<Scalars['String']['output']>;
};

/** A billing address for an order. */
export type OrderBillingAddress = OrderAddress & {
    __typename?: 'OrderBillingAddress';
    /** Main address line. */
    address1?: Maybe<Scalars['String']['output']>;
    /** Secondary address line. */
    address2?: Maybe<Scalars['String']['output']>;
    /** City. */
    city?: Maybe<Scalars['String']['output']>;
    /** Company. */
    company?: Maybe<Scalars['String']['output']>;
    /** Country. */
    country: Scalars['String']['output'];
    /** Country code. */
    countryCode: Scalars['String']['output'];
    /** Email address. */
    email?: Maybe<Scalars['String']['output']>;
    /** First name. */
    firstName?: Maybe<Scalars['String']['output']>;
    /** Last name. */
    lastName?: Maybe<Scalars['String']['output']>;
    /** Phone number. */
    phone?: Maybe<Scalars['String']['output']>;
    /** Postal code. */
    postalCode: Scalars['String']['output'];
    /** State or province. */
    stateOrProvince?: Maybe<Scalars['String']['output']>;
    /** State or province code. */
    stateOrProvinceCode?: Maybe<Scalars['String']['output']>;
};

/** A consignment for an order. */
export type OrderConsignments = {
    __typename?: 'OrderConsignments';
    /** Download consignments. */
    downloads: Array<OrderDownloadConsignment>;
    /** Email consignments. */
    email: OrderEmailConsignments;
    /** Pickup consignments. */
    pickups: OrderPickupConsignmentConnection;
    /** Shipping consignments. */
    shipping: OrderShippingConsignmentConnection;
};

/** A consignment for an order. */
export type OrderConsignmentsPickupsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** A consignment for an order. */
export type OrderConsignmentsShippingArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** A coupon discount for an order. */
export type OrderCouponDiscount = {
    __typename?: 'OrderCouponDiscount';
    /** Coupon code. */
    couponCode: Scalars['String']['output'];
    /** Amount discounted. */
    discountedAmount: Money;
};

/** A date range filter input object */
export type OrderDateRangeFilterInput = {
    /** The start date of the date range filter. */
    from: Scalars['DateTime']['input'];
    /** The end date of the date range filter. */
    to?: InputMaybe<Scalars['DateTime']['input']>;
};

/** A digital line item for an order. */
export type OrderDigitalLineItem = OrderLineItemInterface & {
    __typename?: 'OrderDigitalLineItem';
    /** Optional brand. */
    brand?: Maybe<Scalars['String']['output']>;
    /** List of download file urls. */
    downloadFileUrls: Array<Scalars['String']['output']>;
    /** Optional page download url. */
    downloadPageUrl?: Maybe<Scalars['String']['output']>;
    /** Digital line item ID. */
    entityId: Scalars['Int']['output'];
    /** Image for the item. */
    image?: Maybe<Image>;
    /** Digital line item display name. */
    name: Scalars['String']['output'];
    /** List of product options. */
    productOptions: Array<OrderLineItemProductOption>;
    /** Quantity. */
    quantity: Scalars['Int']['output'];
    /** Refunded quantity. */
    refundedQuantity: Scalars['Int']['output'];
    /** Line item's list price before discounts, as quoted by the manufacturer/distributor. */
    subTotalListPrice: Money;
    /** Line item's price after all discounts are applied. (The final price before tax calculation). */
    subTotalSalePrice: Money;
};

/** A connection to a list of digital line items. */
export type OrderDigitalLineItemConnection = {
    __typename?: 'OrderDigitalLineItemConnection';
    /** A list of edges. */
    edges?: Maybe<Array<OrderDigitalLineItemEdge>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};

/** An edge in an digital line item connection. */
export type OrderDigitalLineItemEdge = {
    __typename?: 'OrderDigitalLineItemEdge';
    /** A cursor for use in pagination. */
    cursor: Scalars['String']['output'];
    /** The digital line items. */
    node: OrderDigitalLineItem;
};

/** A discount for an order. */
export type OrderDiscounts = {
    __typename?: 'OrderDiscounts';
    /** List of discounts for an order. */
    couponDiscounts: Array<OrderCouponDiscount>;
    /** Non-coupon discount total. */
    nonCouponDiscountTotal: Money;
};

/** A download consignment for an order. */
export type OrderDownloadConsignment = {
    __typename?: 'OrderDownloadConsignment';
    /** Digital line items for the consignment. */
    lineItems: OrderDigitalLineItemConnection;
    /** Recipient email address. */
    recipientEmail: Scalars['String']['output'];
};

/** A download consignment for an order. */
export type OrderDownloadConsignmentLineItemsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** An email consignment for an order. */
export type OrderEmailConsignments = {
    __typename?: 'OrderEmailConsignments';
    /** Gift certificates for the consignment. */
    giftCertificates: OrderGiftCertificateConsignmentConnection;
};

/** An email consignment for an order. */
export type OrderEmailConsignmentsGiftCertificatesArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** Filter for order query. */
export type OrderFilterInput = {
    /** Card id. */
    cartEntityId?: InputMaybe<Scalars['Int']['input']>;
    /** Order id. */
    entityId: Scalars['Int']['input'];
};

/** A gift certificate consignment for an order. */
export type OrderGiftCertificateConsignment = {
    __typename?: 'OrderGiftCertificateConsignment';
    /** Gift certificate line items for the consignment. */
    lineItems: OrderGiftCertificateLineItemConnection;
    /** Recipient email. */
    recipientEmail: Scalars['String']['output'];
};

/** A gift certificate consignment for an order. */
export type OrderGiftCertificateConsignmentLineItemsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of gift certificate consignments. */
export type OrderGiftCertificateConsignmentConnection = {
    __typename?: 'OrderGiftCertificateConsignmentConnection';
    /** A list of edges. */
    edges?: Maybe<Array<OrderGiftCertificateConsignmentEdge>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};

/** An edge in a gift certificate consignment connection. */
export type OrderGiftCertificateConsignmentEdge = {
    __typename?: 'OrderGiftCertificateConsignmentEdge';
    /** A cursor for use in pagination. */
    cursor: Scalars['String']['output'];
    /** The digital gift consignments. */
    node: OrderGiftCertificateConsignment;
};

/** A gift certificate line item for an order. */
export type OrderGiftCertificateLineItem = OrderLineItemInterface & {
    __typename?: 'OrderGiftCertificateLineItem';
    /** Line item ID. */
    entityId: Scalars['Int']['output'];
    /** Line item display name. */
    name: Scalars['String']['output'];
    /** Refunded quantity. */
    refundedQuantity: Scalars['Int']['output'];
    /** Sale price. */
    salePrice: Money;
};

/** A connection to a list of gift certificate line items. */
export type OrderGiftCertificateLineItemConnection = {
    __typename?: 'OrderGiftCertificateLineItemConnection';
    /** A list of edges. */
    edges?: Maybe<Array<OrderGiftCertificateLineItemEdge>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};

/** An edge in a gift certificate line item connection. */
export type OrderGiftCertificateLineItemEdge = {
    __typename?: 'OrderGiftCertificateLineItemEdge';
    /** A cursor for use in pagination. */
    cursor: Scalars['String']['output'];
    /** The digital gift certificates. */
    node: OrderGiftCertificateLineItem;
};

/** An interface for different order line item types */
export type OrderLineItemInterface = {
    /** Line item ID. */
    entityId: Scalars['Int']['output'];
    /** Line item display name. */
    name: Scalars['String']['output'];
    /** Refunded quantity. */
    refundedQuantity: Scalars['Int']['output'];
};

/** A product option for an order line item. */
export type OrderLineItemProductOption = {
    __typename?: 'OrderLineItemProductOption';
    /** Product option name. */
    name: Scalars['String']['output'];
    /** Product option value. */
    value: Scalars['String']['output'];
};

/** A wrapping for an order line item. */
export type OrderLineItemWrapping = {
    __typename?: 'OrderLineItemWrapping';
    /** Wrapping cost. */
    cost: Money;
    /** Wrapping name. */
    name: Scalars['String']['output'];
};

/** A physical line item for an order. */
export type OrderPhysicalLineItem = OrderLineItemInterface & {
    __typename?: 'OrderPhysicalLineItem';
    /** Brand. */
    brand?: Maybe<Scalars['String']['output']>;
    /** Line item ID. */
    entityId: Scalars['Int']['output'];
    /** Image for the item. */
    image?: Maybe<Image>;
    /** Display name. */
    name: Scalars['String']['output'];
    /** ID of parent line item */
    parentLineItemEntityId?: Maybe<Scalars['Int']['output']>;
    /** Product options. */
    productOptions: Array<OrderLineItemProductOption>;
    /** Quantity. */
    quantity: Scalars['Int']['output'];
    /** Refunded quantity. */
    refundedQuantity: Scalars['Int']['output'];
    /** Line item's list price before discounts, as quoted by the manufacturer/distributor. */
    subTotalListPrice: Money;
    /** Line item's price after all discounts are applied. (The final price before tax calculation). */
    subTotalSalePrice: Money;
    /** Wrapping. */
    wrapping?: Maybe<OrderLineItemWrapping>;
};

/** A connection to a list of physical line items. */
export type OrderPhysicalLineItemConnection = {
    __typename?: 'OrderPhysicalLineItemConnection';
    /** A list of edges. */
    edges?: Maybe<Array<OrderPhysicalLineItemEdge>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};

/** An edge in a physical line item connection. */
export type OrderPhysicalLineItemEdge = {
    __typename?: 'OrderPhysicalLineItemEdge';
    /** A cursor for use in pagination. */
    cursor: Scalars['String']['output'];
    /** The digital physical line items. */
    node: OrderPhysicalLineItem;
};

/** A pickup consignment for an order. */
export type OrderPickupConsignment = {
    __typename?: 'OrderPickupConsignment';
    /** Pickup address. */
    address: OrderPickupLocationAddress;
    /** Collection instructions. */
    collectionInstructions: Scalars['String']['output'];
    /** Collection time description. */
    collectionTimeDescription: Scalars['String']['output'];
    /** Consignment ID. */
    entityId: Scalars['Int']['output'];
    /** Physical line items for the consignment. */
    lineItems: OrderPhysicalLineItemConnection;
    /** Location name. */
    locationName: Scalars['String']['output'];
    /** Pickup method display name. */
    pickupMethodName: Scalars['String']['output'];
};

/** A pickup consignment for an order. */
export type OrderPickupConsignmentLineItemsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of pickup consignment. */
export type OrderPickupConsignmentConnection = {
    __typename?: 'OrderPickupConsignmentConnection';
    /** A list of edges. */
    edges?: Maybe<Array<OrderPickupConsignmentEdge>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};

/** An edge in a pickup consignment. */
export type OrderPickupConsignmentEdge = {
    __typename?: 'OrderPickupConsignmentEdge';
    /** A cursor for use in pagination. */
    cursor: Scalars['String']['output'];
    /** The pickup consignments. */
    node: OrderPickupConsignment;
};

/** A location address for an order. */
export type OrderPickupLocationAddress = {
    __typename?: 'OrderPickupLocationAddress';
    /** Main address line. */
    address1: Scalars['String']['output'];
    /** Secondary address line. */
    address2?: Maybe<Scalars['String']['output']>;
    /** City. */
    city: Scalars['String']['output'];
    /** Country. */
    country: Scalars['String']['output'];
    /** Country code. */
    countryCode: Scalars['String']['output'];
    /** Email address. */
    email: Scalars['String']['output'];
    /** Phone number. */
    phone?: Maybe<Scalars['String']['output']>;
    /** Postal code. */
    postalCode: Scalars['String']['output'];
    /** State or province. */
    stateOrProvince?: Maybe<Scalars['String']['output']>;
};

/** A shipment for an order. */
export type OrderShipment = {
    __typename?: 'OrderShipment';
    /** Shipment ID. */
    entityId: Scalars['Int']['output'];
    /** Date and time the shipment was shipped. */
    shippedAt: DateTimeExtended;
    /** Shipping method name. */
    shippingMethodName: Scalars['String']['output'];
    /** Shipping provider name. */
    shippingProviderName: Scalars['String']['output'];
    /** Tracking information. */
    tracking?: Maybe<OrderShipmentTracking>;
};

/** A connection to a list of order shipments. */
export type OrderShipmentConnection = {
    __typename?: 'OrderShipmentConnection';
    /** A list of edges. */
    edges?: Maybe<Array<OrderShipmentEdge>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};

/** An edge in an order shipments connection. */
export type OrderShipmentEdge = {
    __typename?: 'OrderShipmentEdge';
    /** A cursor for use in pagination. */
    cursor: Scalars['String']['output'];
    /** The order shipments. */
    node: OrderShipment;
};

/** Tracking information for a shipment with both number and url provided. */
export type OrderShipmentNumberAndUrlTracking = {
    __typename?: 'OrderShipmentNumberAndUrlTracking';
    /** Tracking number. */
    number: Scalars['String']['output'];
    /** Tracking URL. */
    url: Scalars['String']['output'];
};

/** Tracking information for a shipment with only number provided. */
export type OrderShipmentNumberOnlyTracking = {
    __typename?: 'OrderShipmentNumberOnlyTracking';
    /** Tracking number. */
    number: Scalars['String']['output'];
};

/** Tracking information for a shipment. */
export type OrderShipmentTracking =
    | OrderShipmentNumberAndUrlTracking
    | OrderShipmentNumberOnlyTracking
    | OrderShipmentUrlOnlyTracking;

/** Tracking information for a shipment with only url provided. */
export type OrderShipmentUrlOnlyTracking = {
    __typename?: 'OrderShipmentUrlOnlyTracking';
    /** Tracking URL. */
    url: Scalars['String']['output'];
};

/** A shipping address for an order. */
export type OrderShippingAddress = OrderAddress & {
    __typename?: 'OrderShippingAddress';
    /** Main address line. */
    address1?: Maybe<Scalars['String']['output']>;
    /** Secondary address line. */
    address2?: Maybe<Scalars['String']['output']>;
    /** City. */
    city?: Maybe<Scalars['String']['output']>;
    /** Company. */
    company?: Maybe<Scalars['String']['output']>;
    /** Country. */
    country: Scalars['String']['output'];
    /** Country code. */
    countryCode: Scalars['String']['output'];
    /** Email address. */
    email?: Maybe<Scalars['String']['output']>;
    /** First name. */
    firstName?: Maybe<Scalars['String']['output']>;
    /** Last name. */
    lastName?: Maybe<Scalars['String']['output']>;
    /** Phone number. */
    phone?: Maybe<Scalars['String']['output']>;
    /** Postal code. */
    postalCode: Scalars['String']['output'];
    /** State or province. */
    stateOrProvince?: Maybe<Scalars['String']['output']>;
    /** State or province code. */
    stateOrProvinceCode?: Maybe<Scalars['String']['output']>;
};

/** A shipping consignment for an order. */
export type OrderShippingConsignment = {
    __typename?: 'OrderShippingConsignment';
    /** Consignment ID. */
    entityId: Scalars['Int']['output'];
    /** Handling cost. */
    handlingCost: Money;
    /** Physical line items for the consignment. */
    lineItems: OrderPhysicalLineItemConnection;
    /** List of individual shipments for the consignment. */
    shipments: OrderShipmentConnection;
    /** Address the consignment is shipping to. */
    shippingAddress: OrderShippingAddress;
    /** Shipping cost. */
    shippingCost: Money;
};

/** A shipping consignment for an order. */
export type OrderShippingConsignmentLineItemsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** A shipping consignment for an order. */
export type OrderShippingConsignmentShipmentsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of order shipping consignments. */
export type OrderShippingConsignmentConnection = {
    __typename?: 'OrderShippingConsignmentConnection';
    /** A list of edges. */
    edges?: Maybe<Array<OrderShippingConsignmentEdge>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};

/** An edge in an order shipping consignment connection. */
export type OrderShippingConsignmentEdge = {
    __typename?: 'OrderShippingConsignmentEdge';
    /** A cursor for use in pagination. */
    cursor: Scalars['String']['output'];
    /** The order shipping consignments. */
    node: OrderShippingConsignment;
};

/** An extended order status including a label. */
export type OrderStatus = {
    __typename?: 'OrderStatus';
    /** Order status label. */
    label: Scalars['String']['output'];
    /** Order status value. */
    value?: Maybe<OrderStatusValue>;
};

/** The current status of an order. */
export enum OrderStatusValue {
    AwaitingFulfillment = 'AWAITING_FULFILLMENT',
    AwaitingPayment = 'AWAITING_PAYMENT',
    AwaitingPickup = 'AWAITING_PICKUP',
    AwaitingShipment = 'AWAITING_SHIPMENT',
    Cancelled = 'CANCELLED',
    Completed = 'COMPLETED',
    Declined = 'DECLINED',
    Disputed = 'DISPUTED',
    Incomplete = 'INCOMPLETE',
    ManualVerificationRequired = 'MANUAL_VERIFICATION_REQUIRED',
    PartiallyRefunded = 'PARTIALLY_REFUNDED',
    PartiallyShipped = 'PARTIALLY_SHIPPED',
    Pending = 'PENDING',
    Refunded = 'REFUNDED',
    Shipped = 'SHIPPED',
}

/** A tax for an order. */
export type OrderTax = {
    __typename?: 'OrderTax';
    /** Tax amount. */
    amount: Money;
    /** Tax name. */
    name: Scalars['String']['output'];
};

/** A node for fetching a single order with payment data. */
export type OrderWithPayments = BaseOrder &
    Node & {
        __typename?: 'OrderWithPayments';
        /** Billing address. */
        billingAddress: OrderBillingAddress;
        /** Consignments. */
        consignments?: Maybe<OrderConsignments>;
        /** Message from customer */
        customerMessage?: Maybe<Scalars['String']['output']>;
        /** Discounts. */
        discounts: OrderDiscounts;
        /** Order ID. */
        entityId: Scalars['Int']['output'];
        /** Total cost of handling. */
        handlingCostTotal: Money;
        /** The ID of an object. */
        id: Scalars['ID']['output'];
        /** Indicates whether the taxes are included in the order total. */
        isTaxIncluded: Scalars['Boolean']['output'];
        /** Date and time the order was placed. */
        orderedAt: DateTimeExtended;
        /** The list of payments for an order. */
        payments: PaymentsConnection;
        /** Total cost of shipping. */
        shippingCostTotal: Money;
        /** Order status. */
        status: OrderStatus;
        /** Subtotal. */
        subTotal: Money;
        /** Total tax. */
        taxTotal: Money;
        /** Taxes. */
        taxes: Array<OrderTax>;
        /** The final order total payable amount inclusive of tax, before applying any store credit or gift certificate. */
        totalIncTax: Money;
        /** Date and time the order was last updated. */
        updatedAt: DateTimeExtended;
        /** Total cost of wrapping. */
        wrappingCostTotal: Money;
    };

/** A node for fetching a single order with payment data. */
export type OrderWithPaymentsPaymentsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    filters?: InputMaybe<PaymentsFiltersInput>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of orders. */
export type OrdersConnection = {
    __typename?: 'OrdersConnection';
    /** A list of edges. */
    edges?: Maybe<Array<OrdersEdge>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};

/** An edge in an orders connection. */
export type OrdersEdge = {
    __typename?: 'OrdersEdge';
    /** A cursor for use in pagination. */
    cursor: Scalars['String']['output'];
    /** The orders. */
    node: Order;
};

/** Filter input for orders. */
export type OrdersFiltersInput = {
    /** Filter by date range. */
    dateRange?: InputMaybe<OrderDateRangeFilterInput>;
    /** Filter by order status. */
    status?: InputMaybe<OrderStatusValue>;
};

/** Other Filter */
export type OtherSearchFilter = SearchProductFilter & {
    __typename?: 'OtherSearchFilter';
    /** Indicates whether to display product count next to the filter. */
    displayProductCount: Scalars['Boolean']['output'];
    /** Free shipping filter. */
    freeShipping?: Maybe<OtherSearchFilterItem>;
    /** Indicates whether filter is collapsed by default. */
    isCollapsedByDefault: Scalars['Boolean']['output'];
    /** Is Featured filter. */
    isFeatured?: Maybe<OtherSearchFilterItem>;
    /** Is In Stock filter. */
    isInStock?: Maybe<OtherSearchFilterItem>;
    /** Display name for the filter. */
    name: Scalars['String']['output'];
};

/** Other Filter Item */
export type OtherSearchFilterItem = {
    __typename?: 'OtherSearchFilterItem';
    /** Indicates whether this filter is selected. */
    isSelected: Scalars['Boolean']['output'];
    /** Indicates how many products available for this filter. */
    productCount: Scalars['Int']['output'];
};

/** A connection to a list of items. */
export type PageConnection = {
    __typename?: 'PageConnection';
    /** A list of edges. */
    edges?: Maybe<Array<PageEdge>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};

/** An edge in a connection. */
export type PageEdge = {
    __typename?: 'PageEdge';
    /** A cursor for use in pagination. */
    cursor: Scalars['String']['output'];
    /** The item at the end of the edge. */
    node: WebPage;
};

/** Information about pagination in a connection. */
export type PageInfo = {
    __typename?: 'PageInfo';
    /** When paginating forwards, the cursor to continue. */
    endCursor?: Maybe<Scalars['String']['output']>;
    /** When paginating forwards, are there more items? */
    hasNextPage: Scalars['Boolean']['output'];
    /** When paginating backwards, are there more items? */
    hasPreviousPage: Scalars['Boolean']['output'];
    /** When paginating backwards, the cursor to continue. */
    startCursor?: Maybe<Scalars['String']['output']>;
};

/** Redirect to a page. */
export type PageRedirect = {
    __typename?: 'PageRedirect';
    /** Entity id. */
    entityId: Scalars['Int']['output'];
    /** The ID of an object. */
    id: Scalars['ID']['output'];
    /** Relative destination url. */
    path: Scalars['String']['output'];
};

/** Page type */
export enum PageType {
    AccountAddress = 'ACCOUNT_ADDRESS',
    AccountAddAddress = 'ACCOUNT_ADD_ADDRESS',
    AccountAddReturn = 'ACCOUNT_ADD_RETURN',
    AccountAddWishlist = 'ACCOUNT_ADD_WISHLIST',
    AccountDownloadItem = 'ACCOUNT_DOWNLOAD_ITEM',
    AccountEdit = 'ACCOUNT_EDIT',
    AccountInbox = 'ACCOUNT_INBOX',
    AccountOrdersAll = 'ACCOUNT_ORDERS_ALL',
    AccountOrdersCompleted = 'ACCOUNT_ORDERS_COMPLETED',
    AccountOrdersDetails = 'ACCOUNT_ORDERS_DETAILS',
    AccountOrdersInvoice = 'ACCOUNT_ORDERS_INVOICE',
    AccountRecentItems = 'ACCOUNT_RECENT_ITEMS',
    AccountReturns = 'ACCOUNT_RETURNS',
    AccountReturnSaved = 'ACCOUNT_RETURN_SAVED',
    AccountWishlists = 'ACCOUNT_WISHLISTS',
    AccountWishlistDetails = 'ACCOUNT_WISHLIST_DETAILS',
    AuthAccountCreated = 'AUTH_ACCOUNT_CREATED',
    AuthCreateAcc = 'AUTH_CREATE_ACC',
    AuthForgotPass = 'AUTH_FORGOT_PASS',
    AuthLogin = 'AUTH_LOGIN',
    AuthNewPass = 'AUTH_NEW_PASS',
    Blog = 'BLOG',
    Brands = 'BRANDS',
    Cart = 'CART',
    Compare = 'COMPARE',
    GiftCertBalance = 'GIFT_CERT_BALANCE',
    GiftCertPurchase = 'GIFT_CERT_PURCHASE',
    GiftCertRedeem = 'GIFT_CERT_REDEEM',
    Home = 'HOME',
    OrderInfo = 'ORDER_INFO',
    Search = 'SEARCH',
    Sitemap = 'SITEMAP',
    Subscribed = 'SUBSCRIBED',
    Unsubscribe = 'UNSUBSCRIBE',
}

/** Settings that determine the minimum complexity required for a customer's password. */
export type PasswordComplexitySettings = {
    __typename?: 'PasswordComplexitySettings';
    /** The minimum number of numbers required in passwords. */
    minimumNumbers: Scalars['Int']['output'];
    /** Minimum password length. */
    minimumPasswordLength: Scalars['Int']['output'];
    /** The minimum number of special characters required in passwords. */
    minimumSpecialCharacters: Scalars['Int']['output'];
    /** Require lowercase characters. */
    requireLowerCase: Scalars['Boolean']['output'];
    /** Require numbers. */
    requireNumbers: Scalars['Boolean']['output'];
    /** Require special characters. */
    requireSpecialCharacters: Scalars['Boolean']['output'];
    /** Require uppercase characters. */
    requireUpperCase: Scalars['Boolean']['output'];
};

/** Password form field. */
export type PasswordFormField = FormField & {
    __typename?: 'PasswordFormField';
    /** The default text value for the form field. */
    defaultText?: Maybe<Scalars['String']['output']>;
    /** The entity ID of the form field. */
    entityId: Scalars['Int']['output'];
    /** Indicates whether the form field is built-in. */
    isBuiltIn: Scalars['Boolean']['output'];
    /** Indicates whether the form field is required. */
    isRequired: Scalars['Boolean']['output'];
    /** The label to display for the form field. */
    label: Scalars['String']['output'];
    /** The maximum amount of characters that can be entered into the form field. */
    maxLength?: Maybe<Scalars['Int']['output']>;
    /** The sort order priority of the form field. */
    sortOrder: Scalars['Int']['output'];
};

/** The user input for password form fields. */
export type PasswordFormFieldInput = {
    /** The custom form field ID. */
    fieldEntityId: Scalars['Int']['input'];
    /** Password value. */
    password: Scalars['String']['input'];
};

/** Password custom form field value. */
export type PasswordFormFieldValue = CustomerFormFieldValue & {
    __typename?: 'PasswordFormFieldValue';
    /** Entity ID of a custom form field value on a customer or customer address. */
    entityId: Scalars['Int']['output'];
    /** The name of the form field that the value is for. */
    name: Scalars['String']['output'];
    /** The password text submitted by a customer. */
    password: Scalars['String']['output'];
};

/** A payment for an order. */
export type Payment = {
    __typename?: 'Payment';
    /** The amount of the payment. */
    amount: Money;
    /** The specific details on the type of payment. */
    detail?: Maybe<PaymentInstrument>;
    /** The id of the payment method. */
    paymentMethodId: Scalars['String']['output'];
    /** The name of the payment method. */
    paymentMethodName: Scalars['String']['output'];
};

/** The specific details of the instrument used for this payment. */
export type PaymentInstrument = CreditCardPaymentInstrument | GiftCertificatePaymentInstrument;

/** The status of a payment. */
export enum PaymentResultStatus {
    Error = 'ERROR',
    Failure = 'FAILURE',
    Pending = 'PENDING',
    Success = 'SUCCESS',
}

/** A connection to the list of payments. */
export type PaymentsConnection = {
    __typename?: 'PaymentsConnection';
    /** A list of edges. */
    edges?: Maybe<Array<PaymentsEdge>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};

/** An edge in a connection. */
export type PaymentsEdge = {
    __typename?: 'PaymentsEdge';
    /** A cursor for use in pagination. */
    cursor: Scalars['String']['output'];
    /** The item at the end of the edge. */
    node: Payment;
};

/** Filter input for payments. */
export type PaymentsFiltersInput = {
    /** The status we want to fetch orders by. */
    status?: InputMaybe<PaymentResultStatus>;
};

/** Pick list form field. Similar to Radio Buttons, but should be rendered as a dropdown select. */
export type PicklistFormField = FormField & {
    __typename?: 'PicklistFormField';
    /** The text to display before a user has made a selection. */
    choosePrefix: Scalars['String']['output'];
    /** The entity ID of the form field. */
    entityId: Scalars['Int']['output'];
    /** Indicates whether the form field is built-in. */
    isBuiltIn: Scalars['Boolean']['output'];
    /** Indicates whether the form field is required. */
    isRequired: Scalars['Boolean']['output'];
    /** The label to display for the form field. */
    label: Scalars['String']['output'];
    /** The options for the form field. */
    options: Array<FormFieldOption>;
    /** The sort order priority of the form field. */
    sortOrder: Scalars['Int']['output'];
};

/** Pick list or text form field. This field can either be rendered as text or a dropdown and is used for the State/Province field. */
export type PicklistOrTextFormField = FormField & {
    __typename?: 'PicklistOrTextFormField';
    /** The entity ID of the form field. */
    entityId: Scalars['Int']['output'];
    /** Indicates whether the form field is built-in. */
    isBuiltIn: Scalars['Boolean']['output'];
    /** Indicates whether the form field is required. */
    isRequired: Scalars['Boolean']['output'];
    /** The label to display for the form field. */
    label: Scalars['String']['output'];
    /** The maximum amount of characters that can be entered into the form field when it is a text type. */
    maxLength?: Maybe<Scalars['Int']['output']>;
    /** The text to display before a user has made a selection when it is a picklist type. */
    picklistPrefix: Scalars['String']['output'];
    /** The sort order priority of the form field. */
    sortOrder: Scalars['Int']['output'];
};

/** A connection to a list of items. */
export type PopularBrandConnection = {
    __typename?: 'PopularBrandConnection';
    /** A list of edges. */
    edges?: Maybe<Array<PopularBrandEdge>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};

/** An edge in a connection. */
export type PopularBrandEdge = {
    __typename?: 'PopularBrandEdge';
    /** A cursor for use in pagination. */
    cursor: Scalars['String']['output'];
    /** The item at the end of the edge. */
    node: PopularBrandType;
};

/** PopularBrandType */
export type PopularBrandType = {
    __typename?: 'PopularBrandType';
    /** Brand count */
    count: Scalars['Int']['output'];
    /** Brand id */
    entityId: Scalars['Int']['output'];
    /** Brand name */
    name: Scalars['String']['output'];
    /** Brand URL as a relative path */
    path?: Maybe<Scalars['String']['output']>;
};

/** The min and max range of prices that apply to this product. */
export type PriceRanges = {
    __typename?: 'PriceRanges';
    /** Product price min/max range. */
    priceRange: MoneyRange;
    /** Product retail price min/max range. */
    retailPriceRange?: Maybe<MoneyRange>;
};

/** Price Filter */
export type PriceSearchFilter = SearchProductFilter & {
    __typename?: 'PriceSearchFilter';
    /** Indicates whether filter is collapsed by default. */
    isCollapsedByDefault: Scalars['Boolean']['output'];
    /** Display name for the filter. */
    name: Scalars['String']['output'];
    /** Selected price filters. */
    selected?: Maybe<PriceSearchFilterItem>;
};

/** Search by price range. At least a minPrice or maxPrice must be supplied. */
export type PriceSearchFilterInput = {
    /** Maximum price of the product. */
    maxPrice?: InputMaybe<Scalars['Float']['input']>;
    /** Minimum price of the product. */
    minPrice?: InputMaybe<Scalars['Float']['input']>;
};

/** Price filter range */
export type PriceSearchFilterItem = {
    __typename?: 'PriceSearchFilterItem';
    /** Maximum price of the product. */
    maxPrice?: Maybe<Scalars['Float']['output']>;
    /** Minimum price of the product. */
    minPrice?: Maybe<Scalars['Float']['output']>;
};

/** The various prices that can be set on a product. */
export type Prices = {
    __typename?: 'Prices';
    /** Original price of the product. */
    basePrice?: Maybe<Money>;
    /** List of bulk pricing tiers applicable to a product or variant. */
    bulkPricing: Array<BulkPricingTier>;
    /** Minimum advertised price of the product. */
    mapPrice?: Maybe<Money>;
    /** Calculated price of the product.  Calculated price takes into account basePrice, salePrice, rules (modifier, option, option set) that apply to the product configuration, and customer group discounts.  It represents the in-cart price for a product configuration without bulk pricing rules. */
    price: Money;
    /** Product price min/max range. */
    priceRange: MoneyRange;
    /** Retail price of the product. */
    retailPrice?: Maybe<Money>;
    /** Product retail price min/max range. */
    retailPriceRange?: Maybe<MoneyRange>;
    /** Sale price of the product. */
    salePrice?: Maybe<Money>;
    /** The difference between the retail price (MSRP) and the current price, which can be presented to the shopper as their savings. */
    saved?: Maybe<Money>;
};

/** Product */
export type Product = Node & {
    __typename?: 'Product';
    /** Absolute URL path for adding a product to cart. */
    addToCartUrl: Scalars['String']['output'];
    /**
     * Absolute URL path for adding a product to customer's wishlist.
     * @deprecated Deprecated.
     */
    addToWishlistUrl: Scalars['String']['output'];
    /**
     * The availability state of the product.
     * @deprecated Use status inside availabilityV2 instead.
     */
    availability: Scalars['String']['output'];
    /**
     * A few words telling the customer how long it will normally take to ship this product, such as 'Usually ships in 24 hours'.
     * @deprecated Use description inside availabilityV2 instead.
     */
    availabilityDescription: Scalars['String']['output'];
    /** The availability state of the product. */
    availabilityV2: ProductAvailability;
    /** Brand associated with the product. */
    brand?: Maybe<Brand>;
    /** List of categories associated with the product. */
    categories: CategoryConnection;
    /** Product condition */
    condition?: Maybe<ProductConditionType>;
    /**
     * Product creation date
     * @deprecated Alpha version. Do not use in production.
     */
    createdAt: DateTimeExtended;
    /** Custom fields of the product. */
    customFields: CustomFieldConnection;
    /** Default image for a product. */
    defaultImage?: Maybe<Image>;
    /** Depth of the product. */
    depth?: Maybe<Measurement>;
    /** Description of the product. */
    description: Scalars['String']['output'];
    /** Id of the product. */
    entityId: Scalars['Int']['output'];
    /** Gift wrapping options available for the product. */
    giftWrappingOptions: GiftWrappingConnection;
    /** Global trade item number. */
    gtin?: Maybe<Scalars['String']['output']>;
    /** Height of the product. */
    height?: Maybe<Measurement>;
    /** The ID of an object */
    id: Scalars['ID']['output'];
    /** A list of the images for a product. */
    images: ImageConnection;
    /** Inventory information of the product. */
    inventory: ProductInventory;
    /** Maximum purchasable quantity for this product in a single order. */
    maxPurchaseQuantity?: Maybe<Scalars['Int']['output']>;
    /** Metafield data related to a product. */
    metafields: MetafieldConnection;
    /** Minimum purchasable quantity for this product in a single order. */
    minPurchaseQuantity?: Maybe<Scalars['Int']['output']>;
    /** Manufacturer part number. */
    mpn?: Maybe<Scalars['String']['output']>;
    /** Name of the product. */
    name: Scalars['String']['output'];
    /**
     * Product options.
     * @deprecated Use productOptions instead.
     */
    options: OptionConnection;
    /** Relative URL path to product page. */
    path: Scalars['String']['output'];
    /** Description of the product in plain text. */
    plainTextDescription: Scalars['String']['output'];
    /**
     * The minimum and maximum price of this product based on variant pricing and/or modifier price rules.
     * @deprecated Use priceRanges inside prices node instead.
     */
    priceRanges?: Maybe<PriceRanges>;
    /** Prices object determined by supplied product ID, variant ID, and selected option IDs. */
    prices?: Maybe<Prices>;
    /** Product options. */
    productOptions: ProductOptionConnection;
    /** Related products for this product. */
    relatedProducts: RelatedProductsConnection;
    /** Summary of the product reviews, includes the total number of reviews submitted and summation of the ratings on the reviews (ratings range from 0-5 per review). */
    reviewSummary: Reviews;
    /** Reviews associated with the product. */
    reviews: ReviewConnection;
    /** Product SEO details. */
    seo: SeoDetails;
    /** Whether or not the cart call to action should be visible for this product. */
    showCartAction: Scalars['Boolean']['output'];
    /** Default product variant when no options are selected. */
    sku: Scalars['String']['output'];
    /** Type of product, ex: physical, digital */
    type: Scalars['String']['output'];
    /** Universal product code. */
    upc?: Maybe<Scalars['String']['output']>;
    /** Variants associated with the product. */
    variants: VariantConnection;
    /** A list of the videos for a product. */
    videos: VideoConnection;
    /** Warranty information of the product. */
    warranty: Scalars['String']['output'];
    /** Weight of the product. */
    weight?: Maybe<Measurement>;
    /** Width of the product. */
    width?: Maybe<Measurement>;
};

/** Product */
export type ProductCategoriesArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** Product */
export type ProductCustomFieldsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
    names?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** Product */
export type ProductGiftWrappingOptionsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** Product */
export type ProductImagesArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** Product */
export type ProductMetafieldsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    keys?: InputMaybe<Array<Scalars['String']['input']>>;
    last?: InputMaybe<Scalars['Int']['input']>;
    namespace: Scalars['String']['input'];
};

/** Product */
export type ProductOptionsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** Product */
export type ProductPlainTextDescriptionArgs = {
    characterLimit?: InputMaybe<Scalars['Int']['input']>;
};

/** Product */
export type ProductPriceRangesArgs = {
    includeTax?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Product */
export type ProductPricesArgs = {
    currencyCode?: InputMaybe<CurrencyCode>;
    includeTax?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Product */
export type ProductProductOptionsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** Product */
export type ProductRelatedProductsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    hideOutOfStock?: InputMaybe<Scalars['Boolean']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** Product */
export type ProductReviewsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    filters?: InputMaybe<ProductReviewsFiltersInput>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
    sort?: InputMaybe<ProductReviewsSortInput>;
};

/** Product */
export type ProductVariantsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    entityIds?: InputMaybe<Array<Scalars['Int']['input']>>;
    first?: InputMaybe<Scalars['Int']['input']>;
    isPurchasable?: InputMaybe<Scalars['Boolean']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
    optionValueIds?: InputMaybe<Array<OptionValueId>>;
    skus?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** Product */
export type ProductVideosArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** Product Attribute Filter */
export type ProductAttributeSearchFilter = SearchProductFilter & {
    __typename?: 'ProductAttributeSearchFilter';
    /** List of available product attributes. */
    attributes: ProductAttributeSearchFilterItemConnection;
    /** Indicates whether to display product count next to the filter. */
    displayProductCount: Scalars['Boolean']['output'];
    /** Filter name for building filter URLs */
    filterName: Scalars['String']['output'];
    /** Indicates whether filter is collapsed by default. */
    isCollapsedByDefault: Scalars['Boolean']['output'];
    /** Display name for the filter. */
    name: Scalars['String']['output'];
};

/** Product Attribute Filter */
export type ProductAttributeSearchFilterAttributesArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** Filter by the attributes of products such as Product Options and Product Custom Fields. This filter will do nothing unless your store has the Product Filtering feature available on your plan and enabled. If it is supplied when your store does not have the feature enabled, it will be silently ignored. */
export type ProductAttributeSearchFilterInput = {
    /** Product attributes */
    attribute: Scalars['String']['input'];
    /** Product attribute values */
    values: Array<Scalars['String']['input']>;
};

/** Specific product attribute filter item */
export type ProductAttributeSearchFilterItem = {
    __typename?: 'ProductAttributeSearchFilterItem';
    /** Indicates whether product attribute is selected. */
    isSelected: Scalars['Boolean']['output'];
    /** Indicates how many products available for this filter. */
    productCount: Scalars['Int']['output'];
    /** Product attribute value. */
    value: Scalars['String']['output'];
};

/** A connection to a list of items. */
export type ProductAttributeSearchFilterItemConnection = {
    __typename?: 'ProductAttributeSearchFilterItemConnection';
    /** A list of edges. */
    edges?: Maybe<Array<ProductAttributeSearchFilterItemEdge>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ProductAttributeSearchFilterItemEdge = {
    __typename?: 'ProductAttributeSearchFilterItemEdge';
    /** A cursor for use in pagination. */
    cursor: Scalars['String']['output'];
    /** The item at the end of the edge. */
    node: ProductAttributeSearchFilterItem;
};

/** Product availability */
export type ProductAvailability = {
    /** A few words telling the customer how long it will normally take to ship this product, such as 'Usually ships in 24 hours'. */
    description: Scalars['String']['output'];
    /** The availability state of the product. */
    status: ProductAvailabilityStatus;
};

/** Product availability status */
export enum ProductAvailabilityStatus {
    Available = 'Available',
    Preorder = 'Preorder',
    Unavailable = 'Unavailable',
}

/** Available Product */
export type ProductAvailable = ProductAvailability & {
    __typename?: 'ProductAvailable';
    /** A few words telling the customer how long it will normally take to ship this product, such as 'Usually ships in 24 hours'. */
    description: Scalars['String']['output'];
    /** The availability state of the product. */
    status: ProductAvailabilityStatus;
};

/** Product condition */
export enum ProductConditionType {
    New = 'NEW',
    Refurbished = 'REFURBISHED',
    Used = 'USED',
}

/** A connection to a list of items. */
export type ProductConnection = {
    __typename?: 'ProductConnection';
    /** Collection info */
    collectionInfo?: Maybe<CollectionInfo>;
    /** A list of edges. */
    edges?: Maybe<Array<ProductEdge>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ProductEdge = {
    __typename?: 'ProductEdge';
    /** A cursor for use in pagination. */
    cursor: Scalars['String']['output'];
    /** The item at the end of the edge. */
    node: Product;
};

/** Product ID did not map to any existing products. */
export type ProductIdNotFoundError = Error & {
    __typename?: 'ProductIdNotFoundError';
    /** Error message. */
    message: Scalars['String']['output'];
};

/** Product Inventory Information */
export type ProductInventory = {
    __typename?: 'ProductInventory';
    /** Aggregated product inventory information. This data may not be available if not set or if the store's Inventory Settings have disabled displaying stock levels on the storefront. */
    aggregated?: Maybe<AggregatedInventory>;
    /** Indicates whether this product's inventory is being tracked on variant level. If true, you may wish to check the variants node to understand the true inventory of each individual variant, rather than relying on this product-level aggregate to understand how many items may be added to cart. */
    hasVariantInventory: Scalars['Boolean']['output'];
    /** Indicates whether this product is in stock. */
    isInStock: Scalars['Boolean']['output'];
};

/** Product Option */
export type ProductOption = {
    __typename?: 'ProductOption';
    /** Display name for the option. */
    displayName: Scalars['String']['output'];
    /** Unique ID for the option. */
    entityId: Scalars['Int']['output'];
    /** One of the option values is required to be selected for the checkout. */
    isRequired: Scalars['Boolean']['output'];
    /** Option values. */
    values: OptionValueConnection;
};

/** Product Option */
export type ProductOptionValuesArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of items. */
export type ProductOptionConnection = {
    __typename?: 'ProductOptionConnection';
    /** A list of edges. */
    edges?: Maybe<Array<ProductOptionEdge>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ProductOptionEdge = {
    __typename?: 'ProductOptionEdge';
    /** A cursor for use in pagination. */
    cursor: Scalars['String']['output'];
    /** The item at the end of the edge. */
    node: CatalogProductOption;
};

/** Product Option Value */
export type ProductOptionValue = {
    __typename?: 'ProductOptionValue';
    /** Unique ID for the option value. */
    entityId: Scalars['Int']['output'];
    /** Label for the option value. */
    label: Scalars['String']['output'];
};

/** A connection to a list of items. */
export type ProductOptionValueConnection = {
    __typename?: 'ProductOptionValueConnection';
    /** A list of edges. */
    edges?: Maybe<Array<ProductOptionValueEdge>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ProductOptionValueEdge = {
    __typename?: 'ProductOptionValueEdge';
    /** A cursor for use in pagination. */
    cursor: Scalars['String']['output'];
    /** The item at the end of the edge. */
    node: CatalogProductOptionValue;
};

/** Behavior of the product when stock is equal to 0 */
export enum ProductOutOfStockBehavior {
    DoNothing = 'DO_NOTHING',
    HideProduct = 'HIDE_PRODUCT',
    HideProductAndAccessible = 'HIDE_PRODUCT_AND_ACCESSIBLE',
    HideProductAndRedirect = 'HIDE_PRODUCT_AND_REDIRECT',
}

/** A Product PickList Value - a product to be mapped to the base product if selected. */
export type ProductPickListOptionValue = CatalogProductOptionValue & {
    __typename?: 'ProductPickListOptionValue';
    /** Default image for a pick list product. */
    defaultImage?: Maybe<Image>;
    /** Unique ID for the option value. */
    entityId: Scalars['Int']['output'];
    /** Indicates whether this value is the chosen default selected value. */
    isDefault: Scalars['Boolean']['output'];
    /** Indicates whether this value is selected based on sku/variantEntityId/optionValueIds overlay requested on the product node level. */
    isSelected?: Maybe<Scalars['Boolean']['output']>;
    /** Label for the option value. */
    label: Scalars['String']['output'];
    /** The ID of the product associated with this option value. */
    productId: Scalars['Int']['output'];
};

/** PreOrder Product */
export type ProductPreOrder = ProductAvailability & {
    __typename?: 'ProductPreOrder';
    /** A few words telling the customer how long it will normally take to ship this product, such as 'Usually ships in 24 hours'. */
    description: Scalars['String']['output'];
    /** The message to be shown in the store when a product is put into the pre-order availability state, e.g. "Expected release date is %%DATE%%" */
    message?: Maybe<Scalars['String']['output']>;
    /** The availability state of the product. */
    status: ProductAvailabilityStatus;
    /** Product release date */
    willBeReleasedAt?: Maybe<DateTimeExtended>;
};

/** Redirect to a product. */
export type ProductRedirect = {
    __typename?: 'ProductRedirect';
    /** Entity id. */
    entityId: Scalars['Int']['output'];
    /** The ID of an object. */
    id: Scalars['ID']['output'];
    /** Relative destination url. */
    path: Scalars['String']['output'];
};

/** Content of the review to be added */
export type ProductReviewInput = {
    /** Product review author. */
    author: Scalars['String']['input'];
    /** Email of review author. */
    email?: InputMaybe<Scalars['String']['input']>;
    /** Product review rating. */
    rating: Scalars['Int']['input'];
    /** Product review text. */
    text: Scalars['String']['input'];
    /** Product review title. */
    title: Scalars['String']['input'];
};

/** Product reviews filters. */
export type ProductReviewsFiltersInput = {
    /** Product reviews filter by rating. */
    rating?: InputMaybe<ProductReviewsRatingFilterInput>;
};

/** Product reviews filter by rating. */
export type ProductReviewsRatingFilterInput = {
    /** Maximum rating of the product. */
    maxRating?: InputMaybe<Scalars['Int']['input']>;
    /** Minimum rating of the product. */
    minRating?: InputMaybe<Scalars['Int']['input']>;
};

/** Product reviews sorting. */
export enum ProductReviewsSortInput {
    HighestRating = 'HIGHEST_RATING',
    LowestRating = 'LOWEST_RATING',
    Newest = 'NEWEST',
    Oldest = 'OLDEST',
}

/** Unavailable Product */
export type ProductUnavailable = ProductAvailability & {
    __typename?: 'ProductUnavailable';
    /** A few words telling the customer how long it will normally take to ship this product, such as 'Usually ships in 24 hours'. */
    description: Scalars['String']['output'];
    /** The message to be shown in the store when "Call for pricing" is enabled for this product, e.g. "Contact us at 555-5555" */
    message?: Maybe<Scalars['String']['output']>;
    /** The availability state of the product. */
    status: ProductAvailabilityStatus;
};

/** Public Wishlist */
export type PublicWishlist = {
    __typename?: 'PublicWishlist';
    /** The wishlist id. */
    entityId: Scalars['Int']['output'];
    /** A list of the wishlist items */
    items: WishlistItemConnection;
    /** The wishlist name. */
    name: Scalars['String']['output'];
    /** The wishlist token. */
    token: Scalars['String']['output'];
};

/** Public Wishlist */
export type PublicWishlistItemsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    hideOutOfStock?: InputMaybe<Scalars['Boolean']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

export type Query = {
    __typename?: 'Query';
    /** The current channel. */
    channel: Channel;
    /** The currently logged in customer. */
    customer?: Maybe<Customer>;
    /** Geography information. */
    geography: Geography;
    /** An inventory */
    inventory: Inventory;
    /** Fetches an object given its ID */
    node?: Maybe<Node>;
    /** A site */
    site: Site;
    /** The current store. */
    store: Store;
};

export type QueryNodeArgs = {
    id: Scalars['ID']['input'];
};

/** Radio buttons form field. */
export type RadioButtonsFormField = FormField & {
    __typename?: 'RadioButtonsFormField';
    /** The entity ID of the form field. */
    entityId: Scalars['Int']['output'];
    /** Indicates whether the form field is built-in. */
    isBuiltIn: Scalars['Boolean']['output'];
    /** Indicates whether the form field is required. */
    isRequired: Scalars['Boolean']['output'];
    /** The label to display for the form field. */
    label: Scalars['String']['output'];
    /** The options for the form field. */
    options: Array<FormFieldOption>;
    /** The sort order priority of the form field. */
    sortOrder: Scalars['Int']['output'];
};

/** Rating Filter */
export type RatingSearchFilter = SearchProductFilter & {
    __typename?: 'RatingSearchFilter';
    /** Indicates whether filter is collapsed by default. */
    isCollapsedByDefault: Scalars['Boolean']['output'];
    /** Display name for the filter. */
    name: Scalars['String']['output'];
    /** List of available ratings. */
    ratings: RatingSearchFilterItemConnection;
};

/** Rating Filter */
export type RatingSearchFilterRatingsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** Filter by rating. At least a minRating or maxRating must be supplied. This filter will do nothing unless your store has the Product Filtering feature available on your plan and enabled. If it is supplied when your store does not have the feature enabled, it will be silently ignored. */
export type RatingSearchFilterInput = {
    /** Maximum rating of the product. */
    maxRating?: InputMaybe<Scalars['Float']['input']>;
    /** Minimum rating of the product. */
    minRating?: InputMaybe<Scalars['Float']['input']>;
};

/** Specific rating filter item */
export type RatingSearchFilterItem = {
    __typename?: 'RatingSearchFilterItem';
    /** Indicates whether rating is selected. */
    isSelected: Scalars['Boolean']['output'];
    /** Indicates how many products available for this filter. */
    productCount: Scalars['Int']['output'];
    /** Rating value. */
    value: Scalars['String']['output'];
};

/** A connection to a list of items. */
export type RatingSearchFilterItemConnection = {
    __typename?: 'RatingSearchFilterItemConnection';
    /** A list of edges. */
    edges?: Maybe<Array<RatingSearchFilterItemEdge>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};

/** An edge in a connection. */
export type RatingSearchFilterItemEdge = {
    __typename?: 'RatingSearchFilterItemEdge';
    /** A cursor for use in pagination. */
    cursor: Scalars['String']['output'];
    /** The item at the end of the edge. */
    node: RatingSearchFilterItem;
};

/** A raw HTML page. */
export type RawHtmlPage = Node &
    WebPage & {
        __typename?: 'RawHtmlPage';
        /** Unique ID for the web page. */
        entityId: Scalars['Int']['output'];
        /** The body of the page. */
        htmlBody: Scalars['String']['output'];
        /** The ID of an object */
        id: Scalars['ID']['output'];
        /** Whether or not the page should be visible in the navigation menu. */
        isVisibleInNavigation: Scalars['Boolean']['output'];
        /** Page name. */
        name: Scalars['String']['output'];
        /** Unique ID for the parent page. */
        parentEntityId?: Maybe<Scalars['Int']['output']>;
        /** The URL path of the page. */
        path: Scalars['String']['output'];
        /** The plain text summary of the page body. */
        plainTextSummary: Scalars['String']['output'];
        /** Page SEO details. */
        seo: SeoDetails;
    };

/** A raw HTML page. */
export type RawHtmlPagePlainTextSummaryArgs = {
    characterLimit?: InputMaybe<Scalars['Int']['input']>;
};

/** ReCaptcha settings. */
export type ReCaptchaSettings = {
    __typename?: 'ReCaptchaSettings';
    /** Indicates whether ReCaptcha is enabled on the storefront. */
    isEnabledOnStorefront: Scalars['Boolean']['output'];
    /** ReCaptcha site key. */
    siteKey: Scalars['String']['output'];
};

/** Recaptcha input (in case Recaptcha is enabled on a store) */
export type ReCaptchaV2Input = {
    /** Recaptcha token */
    token: Scalars['String']['input'];
};

/** Redirect. */
export type Redirect = Node & {
    __typename?: 'Redirect';
    /** Redirected url. */
    fromPath: Scalars['String']['output'];
    /** The ID of an object. */
    id: Scalars['ID']['output'];
    /** Additional information about redirect. */
    to: RedirectTo;
    /** Full destination url. */
    toUrl: Scalars['String']['output'];
};

/** Type of the redirect. */
export type RedirectTo =
    | BlogPostRedirect
    | BrandRedirect
    | CategoryRedirect
    | ManualRedirect
    | PageRedirect
    | ProductRedirect;

/** The region object */
export type Region = {
    __typename?: 'Region';
    /** The rendered HTML content targeted at the region. */
    html: Scalars['String']['output'];
    /** The name of a region. */
    name: Scalars['String']['output'];
};

/** An error when registering a customer. */
export type RegisterCustomerError =
    | AccountCreationDisabledError
    | CustomerRegistrationError
    | EmailAlreadyInUseError
    | ValidationError;

/** The values to use for customer registration. */
export type RegisterCustomerInput = {
    /** The address of the customer. */
    address?: InputMaybe<AddCustomerAddressInput>;
    /** The company of the customer. */
    company?: InputMaybe<Scalars['String']['input']>;
    /** The email of the customer. */
    email: Scalars['String']['input'];
    /** The first name of the customer. */
    firstName: Scalars['String']['input'];
    /** The custom form fields that the customer filled out. */
    formFields?: InputMaybe<CustomerFormFieldsInput>;
    /** The last name of the customer. */
    lastName: Scalars['String']['input'];
    /** The password supplied by the customer. */
    password: Scalars['String']['input'];
    /** The phone number of the customer. */
    phone?: InputMaybe<Scalars['String']['input']>;
};

/** The result of registering a customer. */
export type RegisterCustomerResult = {
    __typename?: 'RegisterCustomerResult';
    /** The customer that was registered. */
    customer?: Maybe<Customer>;
    /** The errors, if any, that occured during the registration. */
    errors: Array<RegisterCustomerError>;
};

/** A connection to a list of items. */
export type RelatedProductsConnection = {
    __typename?: 'RelatedProductsConnection';
    /** A list of edges. */
    edges?: Maybe<Array<RelatedProductsEdge>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};

/** An edge in a connection. */
export type RelatedProductsEdge = {
    __typename?: 'RelatedProductsEdge';
    /** A cursor for use in pagination. */
    cursor: Scalars['String']['output'];
    /** The item at the end of the edge. */
    node: Product;
};

/** The rendered regions by specific page. */
export type RenderedRegionsByPageType = {
    __typename?: 'RenderedRegionsByPageType';
    /** List of regions */
    regions: Array<Region>;
};

/** An error when requesting a reset password email. */
export type RequestResetPasswordError = ValidationError;

/** Input for requesting a reset password email. */
export type RequestResetPasswordInput = {
    /** The email address of the customer requesting a reset password email. */
    email: Scalars['String']['input'];
    /** A path to direct the customer to from the email. */
    path?: InputMaybe<Scalars['String']['input']>;
};

/** The result of requesting a reset password email. */
export type RequestResetPasswordResult = {
    __typename?: 'RequestResetPasswordResult';
    /** The errors, if any, that occured during the request. */
    errors: Array<RequestResetPasswordError>;
};

/** An error when resetting a password. */
export type ResetPasswordError = CustomerPasswordError | ValidationError;

/** Input for resetting a password. */
export type ResetPasswordInput = {
    /** The customer ID of the customer resetting their password. */
    customerEntityId: Scalars['Int']['input'];
    /** The new password for the customer. */
    newPassword: Scalars['String']['input'];
    /** The token sent to the customer in the reset password email. */
    token: Scalars['String']['input'];
};

/** The result of resetting a password. */
export type ResetPasswordResult = {
    __typename?: 'ResetPasswordResult';
    /** The errors, if any, that occurred during the request. */
    errors: Array<ResetPasswordError>;
};

/** Review */
export type Review = {
    __typename?: 'Review';
    /** Product review author. */
    author: Author;
    /** Product review creation date. */
    createdAt: DateTimeExtended;
    /** Unique ID for the product review. */
    entityId: Scalars['Long']['output'];
    /** Product review rating. */
    rating: Scalars['Int']['output'];
    /** Product review text. */
    text: Scalars['String']['output'];
    /** Product review title. */
    title: Scalars['String']['output'];
};

/** A connection to a list of items. */
export type ReviewConnection = {
    __typename?: 'ReviewConnection';
    /** A list of edges. */
    edges?: Maybe<Array<ReviewEdge>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ReviewEdge = {
    __typename?: 'ReviewEdge';
    /** A cursor for use in pagination. */
    cursor: Scalars['String']['output'];
    /** The item at the end of the edge. */
    node: Review;
};

/** Review Rating Summary */
export type Reviews = {
    __typename?: 'Reviews';
    /**
     * Average rating of the product.
     * @deprecated Alpha version. Do not use in production.
     */
    averageRating: Scalars['Float']['output'];
    /** Total number of reviews on product. */
    numberOfReviews: Scalars['Int']['output'];
    /** Summation of rating scores from each review. */
    summationOfRatings: Scalars['Int']['output'];
};

/** route */
export type Route = {
    __typename?: 'Route';
    /** Node */
    node?: Maybe<Node>;
    /** Redirect details for a given path (if exists). */
    redirect?: Maybe<Redirect>;
};

/** Enum value to specify the desired behavior when encountering a redirect for the requested route. */
export enum RouteRedirectBehavior {
    /** If there is a dynamic/association redirect configured, the `node` node will return a resulting entity (category, product, etc.) that a redirect points to. If there is a static/manual redirect configured, the `node` node will return null, as there is no entity associated with it, the `redirect node` however will return the redirect details. */
    Follow = 'FOLLOW',
    /** No redirects are taken into account, relying on custom URLs only. If there is the same path for both redirect and entity URL configured, both `redirect` node and `node` node return respective non-null values. */
    Ignore = 'IGNORE',
}

/** Store search settings. */
export type Search = {
    __typename?: 'Search';
    /** Product filtering enabled. */
    productFilteringEnabled: Scalars['Boolean']['output'];
};

/** Search Product Filter */
export type SearchProductFilter = {
    /** Indicates whether filter is collapsed by default. */
    isCollapsedByDefault: Scalars['Boolean']['output'];
    /** Display name for the filter. */
    name: Scalars['String']['output'];
};

/** A connection to a list of items. */
export type SearchProductFilterConnection = {
    __typename?: 'SearchProductFilterConnection';
    /** A list of edges. */
    edges?: Maybe<Array<SearchProductFilterEdge>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};

/** An edge in a connection. */
export type SearchProductFilterEdge = {
    __typename?: 'SearchProductFilterEdge';
    /** A cursor for use in pagination. */
    cursor: Scalars['String']['output'];
    /** The item at the end of the edge. */
    node: SearchProductFilter;
};

/** Container for catalog search results, which may contain both products as well as a list of search filters for further refinement. */
export type SearchProducts = {
    __typename?: 'SearchProducts';
    /** Available product filters. */
    filters: SearchProductFilterConnection;
    /** Details of the products. */
    products: ProductConnection;
};

/** Container for catalog search results, which may contain both products as well as a list of search filters for further refinement. */
export type SearchProductsFiltersArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** Container for catalog search results, which may contain both products as well as a list of search filters for further refinement. */
export type SearchProductsProductsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** Object containing available search filters for use when querying Products. */
export type SearchProductsFiltersInput = {
    /** Filter by products belonging to any of the specified Brands. */
    brandEntityIds?: InputMaybe<Array<Scalars['Int']['input']>>;
    /** Filter by products belonging to a single Category. This is intended for use when presenting a Category page in a PLP experience. This argument must be used in order for custom product sorts and custom product filtering settings targeted at a particular category to take effect. */
    categoryEntityId?: InputMaybe<Scalars['Int']['input']>;
    /** Filter by products belonging to any of the specified Categories. Intended for Advanced Search and Faceted Search/Product Filtering use cases, not for a page for a specific Category. */
    categoryEntityIds?: InputMaybe<Array<Scalars['Int']['input']>>;
    /** When set to True, hides products which are out of stock. Defaults to False. This filter will do nothing unless your store has the Product Filtering feature available on your plan and enabled. If it is supplied when your store does not have the feature enabled, it will be silently ignored. */
    hideOutOfStock?: InputMaybe<Scalars['Boolean']['input']>;
    /** Filters by Products which have explicitly been marked as Featured within the catalog. If not supplied, the Featured status of products will not be considered when returning the list of products. */
    isFeatured?: InputMaybe<Scalars['Boolean']['input']>;
    /** Filters by Products which have explicit Free Shipping configured within the catalog. If not supplied, the Free Shipping status of products will not be considered when returning the list of products. */
    isFreeShipping?: InputMaybe<Scalars['Boolean']['input']>;
    /** Search by price range. At least a minPrice or maxPrice must be supplied. */
    price?: InputMaybe<PriceSearchFilterInput>;
    /** Filter by the attributes of products such as Product Options and Product Custom Fields. This filter will do nothing unless your store has the Product Filtering feature available on your plan and enabled. If it is supplied when your store does not have the feature enabled, it will be silently ignored. */
    productAttributes?: InputMaybe<Array<ProductAttributeSearchFilterInput>>;
    /** Filter by rating. At least a minRating or maxRating must be supplied. This filter will do nothing unless your store has the Product Filtering feature available on your plan and enabled. If it is supplied when your store does not have the feature enabled, it will be silently ignored. */
    rating?: InputMaybe<RatingSearchFilterInput>;
    /** Boolean argument to determine whether products within sub-Categories will be returned when filtering products by Category. Defaults to False if not supplied. */
    searchSubCategories?: InputMaybe<Scalars['Boolean']['input']>;
    /** Textual search term. Used to search for products based on text entered by a shopper, typically in a search box. Searches against several fields on the product including Name, SKU, and Description. */
    searchTerm?: InputMaybe<Scalars['String']['input']>;
};

/** Sort to use for the product results. Relevance is the default for textual search terms, and “Featured” is the default for category page contexts without a search term. */
export enum SearchProductsSortInput {
    AToZ = 'A_TO_Z',
    BestReviewed = 'BEST_REVIEWED',
    BestSelling = 'BEST_SELLING',
    Featured = 'FEATURED',
    HighestPrice = 'HIGHEST_PRICE',
    LowestPrice = 'LOWEST_PRICE',
    Newest = 'NEWEST',
    Relevance = 'RELEVANCE',
    ZToA = 'Z_TO_A',
}

/** The Search queries. */
export type SearchQueries = {
    __typename?: 'SearchQueries';
    /** Details of the products and facets matching given search criteria. */
    searchProducts: SearchProducts;
};

/** The Search queries. */
export type SearchQueriesSearchProductsArgs = {
    filters: SearchProductsFiltersInput;
    sort?: InputMaybe<SearchProductsSortInput>;
};

/** Select checkout shipping option input data object */
export type SelectCheckoutShippingOptionDataInput = {
    /** The shipping option id */
    shippingOptionEntityId: Scalars['String']['input'];
};

/** Select checkout shipping option input object */
export type SelectCheckoutShippingOptionInput = {
    /** The checkout id */
    checkoutEntityId: Scalars['String']['input'];
    /** The consignment id */
    consignmentEntityId: Scalars['String']['input'];
    /** Select checkout shipping option data object */
    data: SelectCheckoutShippingOptionDataInput;
    /** Version number. When provided, will reject the request if the version number is not the latest version of the cart, in order to prevent race conditions. */
    version?: InputMaybe<Scalars['Int']['input']>;
};

/** Select checkout shipping option result */
export type SelectCheckoutShippingOptionResult = {
    __typename?: 'SelectCheckoutShippingOptionResult';
    /** The Checkout that is updated as a result of mutation. */
    checkout?: Maybe<Checkout>;
};

/** Seo Details */
export type SeoDetails = {
    __typename?: 'SeoDetails';
    /** Meta description. */
    metaDescription: Scalars['String']['output'];
    /** Meta keywords. */
    metaKeywords: Scalars['String']['output'];
    /** Page title. */
    pageTitle: Scalars['String']['output'];
};

/** Store settings information from the control panel. */
export type Settings = {
    __typename?: 'Settings';
    /** Channel ID. */
    channelId: Scalars['Long']['output'];
    /** Checkout settings. */
    checkout?: Maybe<CheckoutSettings>;
    /** Contact information for the store. */
    contact?: Maybe<ContactField>;
    /** Customers settings. */
    customers?: Maybe<CustomersSettings>;
    /** Store display format information. */
    display: DisplayField;
    /** The form fields to display on the storefront during customer registration or address creation. */
    formFields: FormFields;
    /** Inventory settings. */
    inventory?: Maybe<InventorySettings>;
    /**
     * Logo information for the store.
     * @deprecated Use `logoV2` instead.
     */
    logo: LogoField;
    /** Logo information for the store. */
    logoV2: StoreLogo;
    /** ReCaptcha settings. */
    reCaptcha: ReCaptchaSettings;
    /** Store search settings. */
    search: Search;
    /** Store seo information. */
    seo?: Maybe<SeoDetails>;
    /** The social media links of connected platforms to the storefront. */
    socialMediaLinks: Array<SocialMediaLink>;
    /** The current store status. */
    status: StorefrontStatusType;
    /** The customer-facing message associated with the current storefront status. */
    statusMessage?: Maybe<Scalars['String']['output']>;
    /** The hash of the store. */
    storeHash: Scalars['String']['output'];
    /** The name of the store. */
    storeName: Scalars['String']['output'];
    /** Storefront settings. */
    storefront: Storefront;
    /** The tax display settings object */
    tax?: Maybe<TaxDisplaySettings>;
    /** Store urls. */
    url: UrlField;
};

/** A connection to a list of items. */
export type ShopByPriceConnection = {
    __typename?: 'ShopByPriceConnection';
    /** A list of edges. */
    edges?: Maybe<Array<ShopByPriceEdge>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ShopByPriceEdge = {
    __typename?: 'ShopByPriceEdge';
    /** A cursor for use in pagination. */
    cursor: Scalars['String']['output'];
    /** The item at the end of the edge. */
    node: ShopByPriceRange;
};

/** Category shop by price money ranges */
export type ShopByPriceRange = {
    __typename?: 'ShopByPriceRange';
    /** Category shop by price range. */
    ranges: MoneyRange;
};

/** A site */
export type Site = {
    __typename?: 'Site';
    /** Details of the best selling products. */
    bestSellingProducts: ProductConnection;
    /** Details of a brand. */
    brand?: Maybe<Brand>;
    /** Details of the brand. */
    brands: BrandConnection;
    /** The Cart of the current customer. */
    cart?: Maybe<Cart>;
    /** Retrieve a category object by the id. */
    category?: Maybe<Category>;
    /** A tree of categories. */
    categoryTree: Array<CategoryTreeItem>;
    /** The checkout of the current customer. */
    checkout?: Maybe<Checkout>;
    /** The page content. */
    content: Content;
    /** Store Currencies. */
    currencies: CurrencyConnection;
    /** Currency details. */
    currency?: Maybe<Currency>;
    /** Details of the featured products. */
    featuredProducts: ProductConnection;
    /** Details of the newest products. */
    newestProducts: ProductConnection;
    /** A single order. */
    order?: Maybe<OrderWithPayments>;
    /** List of orders. */
    orders?: Maybe<OrdersConnection>;
    /** List of brands sorted by product count. */
    popularBrands: PopularBrandConnection;
    /** A single product object with variant pricing overlay capabilities. */
    product?: Maybe<Product>;
    /** Details of the products. */
    products: ProductConnection;
    /** Public Wishlist */
    publicWishlist?: Maybe<PublicWishlist>;
    /** Route for a node */
    route: Route;
    /** The Search queries. */
    search: SearchQueries;
    /** Store settings. */
    settings?: Maybe<Settings>;
};

/** A site */
export type SiteBestSellingProductsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    hideOutOfStock?: InputMaybe<Scalars['Boolean']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** A site */
export type SiteBrandArgs = {
    entityId: Scalars['Int']['input'];
};

/** A site */
export type SiteBrandsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    entityIds?: InputMaybe<Array<Scalars['Int']['input']>>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
    productEntityIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** A site */
export type SiteCartArgs = {
    entityId?: InputMaybe<Scalars['String']['input']>;
};

/** A site */
export type SiteCategoryArgs = {
    entityId: Scalars['Int']['input'];
};

/** A site */
export type SiteCategoryTreeArgs = {
    rootEntityId?: InputMaybe<Scalars['Int']['input']>;
};

/** A site */
export type SiteCheckoutArgs = {
    entityId?: InputMaybe<Scalars['String']['input']>;
};

/** A site */
export type SiteCurrenciesArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** A site */
export type SiteCurrencyArgs = {
    currencyCode: CurrencyCode;
};

/** A site */
export type SiteFeaturedProductsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    hideOutOfStock?: InputMaybe<Scalars['Boolean']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** A site */
export type SiteNewestProductsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    hideOutOfStock?: InputMaybe<Scalars['Boolean']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** A site */
export type SiteOrderArgs = {
    filter?: InputMaybe<OrderFilterInput>;
};

/** A site */
export type SiteOrdersArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    filters?: InputMaybe<OrdersFiltersInput>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** A site */
export type SitePopularBrandsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** A site */
export type SiteProductArgs = {
    entityId?: InputMaybe<Scalars['Int']['input']>;
    id?: InputMaybe<Scalars['ID']['input']>;
    optionValueIds?: InputMaybe<Array<OptionValueId>>;
    sku?: InputMaybe<Scalars['String']['input']>;
    useDefaultOptionSelections?: InputMaybe<Scalars['Boolean']['input']>;
    variantEntityId?: InputMaybe<Scalars['Int']['input']>;
};

/** A site */
export type SiteProductsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    entityIds?: InputMaybe<Array<Scalars['Int']['input']>>;
    first?: InputMaybe<Scalars['Int']['input']>;
    hideOutOfStock?: InputMaybe<Scalars['Boolean']['input']>;
    ids?: InputMaybe<Array<Scalars['ID']['input']>>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** A site */
export type SitePublicWishlistArgs = {
    token: Scalars['String']['input'];
};

/** A site */
export type SiteRouteArgs = {
    path: Scalars['String']['input'];
    redirectBehavior?: RouteRedirectBehavior;
};

/** The social media link. */
export type SocialMediaLink = {
    __typename?: 'SocialMediaLink';
    /** The name of the social media link. */
    name: Scalars['String']['output'];
    /** The url of the social media link. */
    url: Scalars['String']['output'];
};

/** Special hour */
export type SpecialHour = {
    __typename?: 'SpecialHour';
    /** Closing time */
    closing?: Maybe<Scalars['DateTime']['output']>;
    /** Upcoming event name */
    label: Scalars['String']['output'];
    /** Is open */
    open: Scalars['Boolean']['output'];
    /** Opening time */
    opening?: Maybe<Scalars['DateTime']['output']>;
};

/** A state or province representation. */
export type StateOrProvince = {
    __typename?: 'StateOrProvince';
    /** An abbreviation of a state or province. */
    abbreviation: Scalars['String']['output'];
    /** An ID of a state or province. */
    entityId: Scalars['Int']['output'];
    /** A name of a state or province. */
    name: Scalars['String']['output'];
};

/** Stock level display setting */
export enum StockLevelDisplay {
    DontShow = 'DONT_SHOW',
    Show = 'SHOW',
    ShowWhenLow = 'SHOW_WHEN_LOW',
}

/** The Store */
export type Store = {
    __typename?: 'Store';
    /** The ID of the store. */
    entityId: Scalars['Long']['output'];
    /** Metafield data related to a store. */
    metafields: MetafieldConnection;
};

/** The Store */
export type StoreMetafieldsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    keys?: InputMaybe<Array<Scalars['String']['input']>>;
    last?: InputMaybe<Scalars['Int']['input']>;
    namespace: Scalars['String']['input'];
};

/** Store logo as image. */
export type StoreImageLogo = {
    __typename?: 'StoreImageLogo';
    /** Logo image. */
    image: Image;
};

/** Store logo. */
export type StoreLogo = StoreImageLogo | StoreTextLogo;

/** Store logo as text. */
export type StoreTextLogo = {
    __typename?: 'StoreTextLogo';
    /** Logo text. */
    text: Scalars['String']['output'];
};

/** Storefront settings. */
export type Storefront = {
    __typename?: 'Storefront';
    /** Storefront catalog settings. */
    catalog?: Maybe<Catalog>;
};

/** Storefront Mode */
export enum StorefrontStatusType {
    Hibernation = 'HIBERNATION',
    Launched = 'LAUNCHED',
    Maintenance = 'MAINTENANCE',
    PreLaunch = 'PRE_LAUNCH',
}

/** Specific sub-category filter item */
export type SubCategorySearchFilterItem = {
    __typename?: 'SubCategorySearchFilterItem';
    /** Category ID. */
    entityId: Scalars['Int']['output'];
    /** Indicates whether category is selected. */
    isSelected: Scalars['Boolean']['output'];
    /** Category name. */
    name: Scalars['String']['output'];
    /** Indicates how many products available for this filter. */
    productCount: Scalars['Int']['output'];
    /** List of available sub-categories. */
    subCategories: SubCategorySearchFilterItemConnection;
};

/** Specific sub-category filter item */
export type SubCategorySearchFilterItemSubCategoriesArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of items. */
export type SubCategorySearchFilterItemConnection = {
    __typename?: 'SubCategorySearchFilterItemConnection';
    /** A list of edges. */
    edges?: Maybe<Array<SubCategorySearchFilterItemEdge>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};

/** An edge in a connection. */
export type SubCategorySearchFilterItemEdge = {
    __typename?: 'SubCategorySearchFilterItemEdge';
    /** A cursor for use in pagination. */
    cursor: Scalars['String']['output'];
    /** The item at the end of the edge. */
    node: SubCategorySearchFilterItem;
};

/** Input for contact us form */
export type SubmitContactUsDataInput = {
    /** Comments */
    comments: Scalars['String']['input'];
    /** Company name */
    companyName?: InputMaybe<Scalars['String']['input']>;
    /** Customer email */
    email: Scalars['String']['input'];
    /** Customer full name */
    fullName?: InputMaybe<Scalars['String']['input']>;
    /** Order number */
    orderNumber?: InputMaybe<Scalars['String']['input']>;
    /** Customer phone number */
    phoneNumber?: InputMaybe<Scalars['String']['input']>;
    /** RMA number */
    rmaNumber?: InputMaybe<Scalars['String']['input']>;
};

/** Error that occurred when submitting the contact us email */
export type SubmitContactUsError = ValidationError;

/** Input for contact us form */
export type SubmitContactUsInput = {
    /** The form data we are submitting */
    data: SubmitContactUsDataInput;
    /** The contact page we're sending on behalf of */
    pageEntityId: Scalars['Int']['input'];
};

/** Result of submitting contact us form */
export type SubmitContactUsResult = {
    __typename?: 'SubmitContactUsResult';
    /** List of errors that occurred executing the mutation. */
    errors: Array<SubmitContactUsError>;
};

/** A swatch option value - swatch values can be associated with a list of hexidecimal colors or an image. */
export type SwatchOptionValue = CatalogProductOptionValue & {
    __typename?: 'SwatchOptionValue';
    /** Unique ID for the option value. */
    entityId: Scalars['Int']['output'];
    /** List of up to 3 hex encoded colors to associate with a swatch value. */
    hexColors: Array<Scalars['String']['output']>;
    /** Absolute path of a swatch texture image. */
    imageUrl?: Maybe<Scalars['String']['output']>;
    /** Indicates whether this value is the chosen default selected value. */
    isDefault: Scalars['Boolean']['output'];
    /** Indicates whether this value is selected based on sku/variantEntityId/optionValueIds overlay requested on the product node level. */
    isSelected?: Maybe<Scalars['Boolean']['output']>;
    /** Label for the option value. */
    label: Scalars['String']['output'];
};

/** A swatch option value - swatch values can be associated with a list of hexidecimal colors or an image. */
export type SwatchOptionValueImageUrlArgs = {
    height?: InputMaybe<Scalars['Int']['input']>;
    lossy?: InputMaybe<Scalars['Boolean']['input']>;
    width: Scalars['Int']['input'];
};

/** The tax display settings object */
export type TaxDisplaySettings = {
    __typename?: 'TaxDisplaySettings';
    /** Tax display setting for Product Details Page. */
    pdp: TaxPriceDisplay;
    /** Tax display setting for Product List Page. */
    plp: TaxPriceDisplay;
};

/** Tax setting can be set included or excluded (Tax setting can also be set to both on PDP/PLP). */
export enum TaxPriceDisplay {
    Both = 'BOTH',
    Ex = 'EX',
    Inc = 'INC',
}

/** A single line text input field. */
export type TextFieldOption = CatalogProductOption & {
    __typename?: 'TextFieldOption';
    /** Default value of the text field option. */
    defaultValue?: Maybe<Scalars['String']['output']>;
    /** Display name for the option. */
    displayName: Scalars['String']['output'];
    /** Unique ID for the option. */
    entityId: Scalars['Int']['output'];
    /** One of the option values is required to be selected for the checkout. */
    isRequired: Scalars['Boolean']['output'];
    /** Indicates whether it is a variant option or modifier. */
    isVariantOption: Scalars['Boolean']['output'];
    /** The maximum number of characters. */
    maxLength?: Maybe<Scalars['Int']['output']>;
    /** The minimum number of characters. */
    minLength?: Maybe<Scalars['Int']['output']>;
};

/** A single line text form field. */
export type TextFormField = FormField & {
    __typename?: 'TextFormField';
    /** The default text value of the text form field. */
    defaultText?: Maybe<Scalars['String']['output']>;
    /** The entity ID of the form field. */
    entityId: Scalars['Int']['output'];
    /** Indicates whether the form field is built-in. */
    isBuiltIn: Scalars['Boolean']['output'];
    /** Indicates whether the form field is required. */
    isRequired: Scalars['Boolean']['output'];
    /** The label to display for the form field. */
    label: Scalars['String']['output'];
    /** The maximum amount of characters that can be entered into the form field. */
    maxLength?: Maybe<Scalars['Int']['output']>;
    /** The sort order priority of the form field. */
    sortOrder: Scalars['Int']['output'];
};

/** The user input for text form fields. */
export type TextFormFieldInput = {
    /** The custom form field ID. */
    fieldEntityId: Scalars['Int']['input'];
    /** Text value. */
    text: Scalars['String']['input'];
};

/** Text custom form field value. */
export type TextFormFieldValue = CustomerFormFieldValue & {
    __typename?: 'TextFormFieldValue';
    /** Entity ID of a custom form field value on a customer or customer address. */
    entityId: Scalars['Int']['output'];
    /** The name of the form field that the value is for. */
    name: Scalars['String']['output'];
    /** The text submitted by a customer. */
    text: Scalars['String']['output'];
};

/** Unapply checkout coupon data object */
export type UnapplyCheckoutCouponDataInput = {
    /** The checkout coupon code */
    couponCode: Scalars['String']['input'];
};

/** Unapply checkout coupon input object */
export type UnapplyCheckoutCouponInput = {
    /** The checkout id */
    checkoutEntityId: Scalars['String']['input'];
    /** Unapply checkout coupon data object */
    data: UnapplyCheckoutCouponDataInput;
    /** Version number. When provided, will reject the request if the version number is not the latest version of the cart, in order to prevent race conditions. */
    version?: InputMaybe<Scalars['Int']['input']>;
};

/** Unapply checkout coupon result */
export type UnapplyCheckoutCouponResult = {
    __typename?: 'UnapplyCheckoutCouponResult';
    /** The Checkout that is updated as a result of mutation. */
    checkout?: Maybe<Checkout>;
};

/** Unassign cart from the customer input object. */
export type UnassignCartFromCustomerInput = {
    /** The cart id. */
    cartEntityId: Scalars['String']['input'];
    /** Version number. When provided, will reject the request if the version number is not the latest version of the cart, in order to prevent race conditions. */
    version?: InputMaybe<Scalars['Int']['input']>;
};

/** Unassign cart from the customer result. */
export type UnassignCartFromCustomerResult = {
    __typename?: 'UnassignCartFromCustomerResult';
    /** The Cart that is updated as a result of mutation. */
    cart?: Maybe<Cart>;
};

/** Catch all error type for any unexpected responses from the AddProductReview mutation rpc. */
export type UnexpectedAddReviewError = Error & {
    __typename?: 'UnexpectedAddReviewError';
    /** Error message. */
    message: Scalars['String']['output'];
};

/** An unexpected error when updating a customer. */
export type UnexpectedUpdateCustomerError = Error & {
    __typename?: 'UnexpectedUpdateCustomerError';
    /** The error message. */
    message: Scalars['String']['output'];
};

/** Update cart currency data object */
export type UpdateCartCurrencyDataInput = {
    /** ISO-4217 currency code */
    currencyCode: Scalars['String']['input'];
};

/** Update cart currency input object */
export type UpdateCartCurrencyInput = {
    /** The cart id */
    cartEntityId: Scalars['String']['input'];
    /** Update cart currency data object */
    data: UpdateCartCurrencyDataInput;
};

/** Update cart currency result */
export type UpdateCartCurrencyResult = {
    __typename?: 'UpdateCartCurrencyResult';
    /** The Cart that is updated as a result of mutation. */
    cart?: Maybe<Cart>;
};

/** Update cart line item data object */
export type UpdateCartLineItemDataInput = {
    /** The gift certificate */
    giftCertificate?: InputMaybe<CartGiftCertificateInput>;
    /** The cart line item */
    lineItem?: InputMaybe<CartLineItemInput>;
};

/** Update cart line item input object */
export type UpdateCartLineItemInput = {
    /** The cart id */
    cartEntityId: Scalars['String']['input'];
    /** Update cart line item data object */
    data: UpdateCartLineItemDataInput;
    /** The line item id */
    lineItemEntityId: Scalars['String']['input'];
    /** Version number. When provided, will reject the request if the version number is not the latest version of the cart, in order to prevent race conditions. */
    version?: InputMaybe<Scalars['Int']['input']>;
};

/** Update cart line item result */
export type UpdateCartLineItemResult = {
    __typename?: 'UpdateCartLineItemResult';
    /** The Cart that is updated as a result of mutation. */
    cart?: Maybe<Cart>;
};

/** Update cart's metafield data. */
export type UpdateCartMetafieldDataInput = {
    /** New key for cart metafield. */
    key?: InputMaybe<Scalars['String']['input']>;
    /** New value for cart metafield. */
    value?: InputMaybe<Scalars['String']['input']>;
};

/** Error that occured as a result of updateCartMetafield mutation. */
export type UpdateCartMetafieldError = AlreadyExistsError | NotAuthorisedError | NotFoundError | ValidationError;

/** Input for update cart's metafield mutation. */
export type UpdateCartMetafieldInput = {
    /** Id of the cart for which to update metafield. */
    cartEntityId: Scalars['String']['input'];
    /** Data to update metafield. */
    data: UpdateCartMetafieldDataInput;
    /** Id of metafield to update. */
    metafieldEntityId: Scalars['Int']['input'];
};

/** Result of updating metafield for cart. */
export type UpdateCartMetafieldResult = {
    __typename?: 'UpdateCartMetafieldResult';
    /** Errors found during update of cart's metafield. */
    errors: Array<UpdateCartMetafieldError>;
    /** Successfully updated metafield for cart. */
    metafield?: Maybe<Metafields>;
};

/** Update checkout billing address data object */
export type UpdateCheckoutBillingAddressDataInput = {
    /** The checkout billing address */
    address: CheckoutAddressInput;
};

/** Update checkout billing address input object */
export type UpdateCheckoutBillingAddressInput = {
    /** The address id */
    addressEntityId: Scalars['String']['input'];
    /** The checkout id */
    checkoutEntityId: Scalars['String']['input'];
    /** Update checkout billing address data object */
    data: UpdateCheckoutBillingAddressDataInput;
    /** Version number. When provided, will reject the request if the version number is not the latest version of the cart, in order to prevent race conditions. */
    version?: InputMaybe<Scalars['Int']['input']>;
};

/** Update checkout billing address result */
export type UpdateCheckoutBillingAddressResult = {
    __typename?: 'UpdateCheckoutBillingAddressResult';
    /** The Checkout that is updated as a result of mutation. */
    checkout?: Maybe<Checkout>;
};

/** Update checkout customer message data object */
export type UpdateCheckoutCustomerMessageDataInput = {
    /** The checkout customer message */
    message: Scalars['String']['input'];
};

/** Update checkout customer message input object */
export type UpdateCheckoutCustomerMessageInput = {
    /** The checkout id */
    checkoutEntityId: Scalars['String']['input'];
    /** Update checkout customer message data object */
    data: UpdateCheckoutCustomerMessageDataInput;
    /** Version number. When provided, will reject the request if the version number is not the latest version of the cart, in order to prevent race conditions. */
    version?: InputMaybe<Scalars['Int']['input']>;
};

/** Update checkout customer message result */
export type UpdateCheckoutCustomerMessageResult = {
    __typename?: 'UpdateCheckoutCustomerMessageResult';
    /** The Checkout that is updated as a result of mutation. */
    checkout?: Maybe<Checkout>;
};

/** Update checkout shipping consignment data object */
export type UpdateCheckoutShippingConsignmentDataInput = {
    /** Checkout shipping consignment input object */
    consignment: CheckoutShippingConsignmentInput;
};

/** Update checkout shipping consignment input object */
export type UpdateCheckoutShippingConsignmentInput = {
    /** The checkout id */
    checkoutEntityId: Scalars['String']['input'];
    /** The consignment id */
    consignmentEntityId: Scalars['String']['input'];
    /** Update checkout shipping consignment data object */
    data: UpdateCheckoutShippingConsignmentDataInput;
    /** Version number. When provided, will reject the request if the version number is not the latest version of the cart, in order to prevent race conditions. */
    version?: InputMaybe<Scalars['Int']['input']>;
};

/** Update checkout shipping consignment result */
export type UpdateCheckoutShippingConsignmentResult = {
    __typename?: 'UpdateCheckoutShippingConsignmentResult';
    /** The Checkout that is updated as a result of mutation. */
    checkout?: Maybe<Checkout>;
};

/** Data fields to update on address. */
export type UpdateCustomerAddressDataInput = {
    /** First line for the street address. */
    address1?: InputMaybe<Scalars['String']['input']>;
    /** Second line for the street address. */
    address2?: InputMaybe<Scalars['String']['input']>;
    /** City. */
    city?: InputMaybe<Scalars['String']['input']>;
    /** Company name associated with the address. */
    company?: InputMaybe<Scalars['String']['input']>;
    /** 2-letter country code. */
    countryCode?: InputMaybe<Scalars['String']['input']>;
    /** First name of address owner. */
    firstName?: InputMaybe<Scalars['String']['input']>;
    /** Additional form fields defined by merchant. */
    formFields?: InputMaybe<CustomerFormFieldsInput>;
    /** Last name of the address owner. */
    lastName?: InputMaybe<Scalars['String']['input']>;
    /** Phone number. */
    phone?: InputMaybe<Scalars['String']['input']>;
    /** Postal code for the address. This is only required for certain countries. */
    postalCode?: InputMaybe<Scalars['String']['input']>;
    /** Name of State or Province. */
    stateOrProvince?: InputMaybe<Scalars['String']['input']>;
};

/** Possible response error when attempting to use UpdateCustomerAddress mutation. */
export type UpdateCustomerAddressError =
    | AddressDoesNotExistError
    | CustomerAddressUpdateError
    | CustomerNotLoggedInError
    | ValidationError;

/** Input for updating a customer address. */
export type UpdateCustomerAddressInput = {
    /** ID of the address to update. */
    addressEntityId: Scalars['Int']['input'];
    /** Data fields to update on address. */
    data: UpdateCustomerAddressDataInput;
};

/** Result of UpdateCustomerAddress mutation. */
export type UpdateCustomerAddressResult = {
    __typename?: 'UpdateCustomerAddressResult';
    /** Customer address that was updated. */
    address?: Maybe<CustomerAddress>;
    /** List of response errors when attempting to update an address. */
    errors: Array<UpdateCustomerAddressError>;
};

/** An error when updating a customer. */
export type UpdateCustomerError =
    | CustomerDoesNotExistError
    | CustomerNotLoggedInError
    | EmailAlreadyInUseError
    | UnexpectedUpdateCustomerError
    | ValidationError;

/** The values to use for customer update operation. */
export type UpdateCustomerInput = {
    /** The company of the customer. */
    company?: InputMaybe<Scalars['String']['input']>;
    /** The email of the customer. */
    email?: InputMaybe<Scalars['String']['input']>;
    /** The first name of the customer. */
    firstName?: InputMaybe<Scalars['String']['input']>;
    /** The custom form fields that the customer filled out. */
    formFields?: InputMaybe<CustomerFormFieldsInput>;
    /** The last name of the customer. */
    lastName?: InputMaybe<Scalars['String']['input']>;
    /** The phone number of the customer. */
    phone?: InputMaybe<Scalars['String']['input']>;
};

/** The result of updating a customer. */
export type UpdateCustomerResult = {
    __typename?: 'UpdateCustomerResult';
    /** The customer that was updated. */
    customer?: Maybe<Customer>;
    /** The errors, if any, that occured during the update operation. */
    errors: Array<UpdateCustomerError>;
};

/** The behavior type for updating stock levels. */
export enum UpdateStockBehavior {
    OrderCompletedOrShipped = 'ORDER_COMPLETED_OR_SHIPPED',
    OrderPlaced = 'ORDER_PLACED',
}

/** Update wishlist input object */
export type UpdateWishlistInput = {
    /** Wishlist data to update */
    data: WishlistUpdateDataInput;
    /** The wishlist id */
    entityId: Scalars['Int']['input'];
};

/** Update wishlist */
export type UpdateWishlistResult = {
    __typename?: 'UpdateWishlistResult';
    /** The wishlist */
    result: Wishlist;
};

/** Url field */
export type UrlField = {
    __typename?: 'UrlField';
    /** CDN url to fetch assets. */
    cdnUrl: Scalars['String']['output'];
    /** Checkout url. */
    checkoutUrl?: Maybe<Scalars['String']['output']>;
    /** Store url. */
    vanityUrl: Scalars['String']['output'];
};

/** Validation error that occurred during a graphql request */
export type ValidationError = Error & {
    __typename?: 'ValidationError';
    /** A description of the error */
    message: Scalars['String']['output'];
    /** Path to the field that caused the error, if applicable */
    path: Array<Scalars['String']['output']>;
};

/** Variant */
export type Variant = Node & {
    __typename?: 'Variant';
    /** Default image for a variant. */
    defaultImage?: Maybe<Image>;
    /** The variant's depth. If a depth was not explicitly specified on the variant, this will be the product's depth. */
    depth?: Maybe<Measurement>;
    /** Id of the variant. */
    entityId: Scalars['Int']['output'];
    /** Global trade item number. */
    gtin?: Maybe<Scalars['String']['output']>;
    /** The variant's height. If a height was not explicitly specified on the variant, this will be the product's height. */
    height?: Maybe<Measurement>;
    /** The ID of an object */
    id: Scalars['ID']['output'];
    /** Variant inventory */
    inventory?: Maybe<VariantInventory>;
    /** Whether the product can be purchased */
    isPurchasable: Scalars['Boolean']['output'];
    /** Metafield data related to a variant. */
    metafields: MetafieldConnection;
    /** Manufacturer part number. */
    mpn?: Maybe<Scalars['String']['output']>;
    /** The options which define a variant. */
    options: OptionConnection;
    /** Variant prices */
    prices?: Maybe<Prices>;
    /** Product options that compose this variant. */
    productOptions: ProductOptionConnection;
    /** Sku of the variant. */
    sku: Scalars['String']['output'];
    /** Universal product code. */
    upc?: Maybe<Scalars['String']['output']>;
    /** The variant's weight. If a weight was not explicitly specified on the variant, this will be the product's weight. */
    weight?: Maybe<Measurement>;
    /** The variant's width. If a width was not explicitly specified on the variant, this will be the product's width. */
    width?: Maybe<Measurement>;
};

/** Variant */
export type VariantMetafieldsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    keys?: InputMaybe<Array<Scalars['String']['input']>>;
    last?: InputMaybe<Scalars['Int']['input']>;
    namespace: Scalars['String']['input'];
};

/** Variant */
export type VariantOptionsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** Variant */
export type VariantPricesArgs = {
    currencyCode?: InputMaybe<CurrencyCode>;
    includeTax?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Variant */
export type VariantProductOptionsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of items. */
export type VariantConnection = {
    __typename?: 'VariantConnection';
    /** A list of edges. */
    edges?: Maybe<Array<VariantEdge>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};

/** An edge in a connection. */
export type VariantEdge = {
    __typename?: 'VariantEdge';
    /** A cursor for use in pagination. */
    cursor: Scalars['String']['output'];
    /** The item at the end of the edge. */
    node: Variant;
};

/** Variant Inventory */
export type VariantInventory = {
    __typename?: 'VariantInventory';
    /** Aggregated product variant inventory information. This data may not be available if not set or if the store's Inventory Settings have disabled displaying stock levels on the storefront. */
    aggregated?: Maybe<Aggregated>;
    /** Inventory by locations. */
    byLocation?: Maybe<LocationConnection>;
    /** Indicates whether this product is in stock. */
    isInStock: Scalars['Boolean']['output'];
};

/** Variant Inventory */
export type VariantInventoryByLocationArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    distanceFilter?: InputMaybe<DistanceFilter>;
    first?: InputMaybe<Scalars['Int']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
    locationEntityCodes?: InputMaybe<Array<Scalars['String']['input']>>;
    locationEntityIds?: InputMaybe<Array<Scalars['Int']['input']>>;
    locationEntityServiceTypeIds?: InputMaybe<Array<Scalars['String']['input']>>;
    locationEntityTypeIds?: InputMaybe<Array<Scalars['String']['input']>>;
};

/** Product video. */
export type Video = {
    __typename?: 'Video';
    /** Title of a video. */
    title: Scalars['String']['output'];
    /** Url of a video. */
    url: Scalars['String']['output'];
};

/** A connection to a list of items. */
export type VideoConnection = {
    __typename?: 'VideoConnection';
    /** A list of edges. */
    edges?: Maybe<Array<VideoEdge>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};

/** An edge in a connection. */
export type VideoEdge = {
    __typename?: 'VideoEdge';
    /** A cursor for use in pagination. */
    cursor: Scalars['String']['output'];
    /** The item at the end of the edge. */
    node: Video;
};

/** WebPage details. */
export type WebPage = {
    /** Unique ID for the web page. */
    entityId: Scalars['Int']['output'];
    /** Whether or not the page should be visible in the navigation menu. */
    isVisibleInNavigation: Scalars['Boolean']['output'];
    /** Page name. */
    name: Scalars['String']['output'];
    /** Unique ID for the parent page. */
    parentEntityId?: Maybe<Scalars['Int']['output']>;
    /** Page SEO details. */
    seo: SeoDetails;
};

/** Web page type */
export enum WebPageType {
    Blog = 'BLOG',
    Contact = 'CONTACT',
    Link = 'LINK',
    Normal = 'NORMAL',
    Raw = 'RAW',
}

/** Object containing filters for querying web pages */
export type WebPagesFiltersInput = {
    /** Ids of the expected pages. */
    entityIds?: InputMaybe<Array<Scalars['Int']['input']>>;
    /** Whether the expected pages are visible in the navigation bar. */
    isVisibleInNavigation?: InputMaybe<Scalars['Boolean']['input']>;
    /** Type of the expected pages. */
    pageType?: InputMaybe<WebPageType>;
};

/** A wishlist */
export type Wishlist = {
    __typename?: 'Wishlist';
    /** The wishlist id. */
    entityId: Scalars['Int']['output'];
    /** Is the wishlist public? */
    isPublic: Scalars['Boolean']['output'];
    /** A list of the wishlist items */
    items: WishlistItemConnection;
    /** The wishlist name. */
    name: Scalars['String']['output'];
    /** The wishlist token. */
    token: Scalars['String']['output'];
};

/** A wishlist */
export type WishlistItemsArgs = {
    after?: InputMaybe<Scalars['String']['input']>;
    before?: InputMaybe<Scalars['String']['input']>;
    first?: InputMaybe<Scalars['Int']['input']>;
    hideOutOfStock?: InputMaybe<Scalars['Boolean']['input']>;
    last?: InputMaybe<Scalars['Int']['input']>;
};

/** A connection to a list of items. */
export type WishlistConnection = {
    __typename?: 'WishlistConnection';
    /** A list of edges. */
    edges?: Maybe<Array<WishlistEdge>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};

/** An edge in a connection. */
export type WishlistEdge = {
    __typename?: 'WishlistEdge';
    /** A cursor for use in pagination. */
    cursor: Scalars['String']['output'];
    /** The item at the end of the edge. */
    node: Wishlist;
};

/** Wishlist filters input object */
export type WishlistFiltersInput = {
    /** A wishlist ids filter. */
    entityIds?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** The wishlist item */
export type WishlistItem = {
    __typename?: 'WishlistItem';
    /** Wishlist item id. */
    entityId: Scalars['Int']['output'];
    /** A product included in the wishlist. */
    product: Product;
    /** An id of the product from the wishlist. */
    productEntityId: Scalars['Int']['output'];
    /** An id of the specific product variant from the wishlist. */
    variantEntityId?: Maybe<Scalars['Int']['output']>;
};

/** A connection to a list of items. */
export type WishlistItemConnection = {
    __typename?: 'WishlistItemConnection';
    /** A list of edges. */
    edges?: Maybe<Array<WishlistItemEdge>>;
    /** Information to aid in pagination. */
    pageInfo: PageInfo;
};

/** An edge in a connection. */
export type WishlistItemEdge = {
    __typename?: 'WishlistItemEdge';
    /** A cursor for use in pagination. */
    cursor: Scalars['String']['output'];
    /** The item at the end of the edge. */
    node: WishlistItem;
};

/** Wishlist item input object */
export type WishlistItemInput = {
    /** An id of the product from the wishlist. */
    productEntityId: Scalars['Int']['input'];
    /** An id of the specific product variant from the wishlist. */
    variantEntityId?: InputMaybe<Scalars['Int']['input']>;
};

/** The wishlist mutations. */
export type WishlistMutations = {
    __typename?: 'WishlistMutations';
    /** Add wishlist items */
    addWishlistItems?: Maybe<AddWishlistItemsResult>;
    /** Create wishlist */
    createWishlist?: Maybe<CreateWishlistResult>;
    /** Delete wishlist items */
    deleteWishlistItems?: Maybe<DeleteWishlistItemsResult>;
    /** Delete wishlist */
    deleteWishlists?: Maybe<DeleteWishlistResult>;
    /** Update wishlist */
    updateWishlist?: Maybe<UpdateWishlistResult>;
};

/** The wishlist mutations. */
export type WishlistMutationsAddWishlistItemsArgs = {
    input: AddWishlistItemsInput;
};

/** The wishlist mutations. */
export type WishlistMutationsCreateWishlistArgs = {
    input: CreateWishlistInput;
};

/** The wishlist mutations. */
export type WishlistMutationsDeleteWishlistItemsArgs = {
    input: DeleteWishlistItemsInput;
};

/** The wishlist mutations. */
export type WishlistMutationsDeleteWishlistsArgs = {
    input: DeleteWishlistsInput;
};

/** The wishlist mutations. */
export type WishlistMutationsUpdateWishlistArgs = {
    input: UpdateWishlistInput;
};

/** Wishlist data to update */
export type WishlistUpdateDataInput = {
    /** A new wishlist visibility mode */
    isPublic?: InputMaybe<Scalars['Boolean']['input']>;
    /** A new wishlist name */
    name?: InputMaybe<Scalars['String']['input']>;
};

/** Country Code */
export enum CountryCode {
    Ad = 'AD',
    Ae = 'AE',
    Af = 'AF',
    Ag = 'AG',
    Ai = 'AI',
    Al = 'AL',
    Am = 'AM',
    Ao = 'AO',
    Aq = 'AQ',
    Ar = 'AR',
    As = 'AS',
    At = 'AT',
    Au = 'AU',
    Aw = 'AW',
    Ax = 'AX',
    Az = 'AZ',
    Ba = 'BA',
    Bb = 'BB',
    Bd = 'BD',
    Be = 'BE',
    Bf = 'BF',
    Bg = 'BG',
    Bh = 'BH',
    Bi = 'BI',
    Bj = 'BJ',
    Bl = 'BL',
    Bm = 'BM',
    Bn = 'BN',
    Bo = 'BO',
    Bq = 'BQ',
    Br = 'BR',
    Bs = 'BS',
    Bt = 'BT',
    Bv = 'BV',
    Bw = 'BW',
    By = 'BY',
    Bz = 'BZ',
    Ca = 'CA',
    Cc = 'CC',
    Cd = 'CD',
    Cf = 'CF',
    Cg = 'CG',
    Ch = 'CH',
    Ci = 'CI',
    Ck = 'CK',
    Cl = 'CL',
    Cm = 'CM',
    Cn = 'CN',
    Co = 'CO',
    Cr = 'CR',
    Cu = 'CU',
    Cv = 'CV',
    Cw = 'CW',
    Cx = 'CX',
    Cy = 'CY',
    Cz = 'CZ',
    De = 'DE',
    Dj = 'DJ',
    Dk = 'DK',
    Dm = 'DM',
    Do = 'DO',
    Dz = 'DZ',
    Ec = 'EC',
    Ee = 'EE',
    Eg = 'EG',
    Eh = 'EH',
    Er = 'ER',
    Es = 'ES',
    Et = 'ET',
    Fi = 'FI',
    Fj = 'FJ',
    Fk = 'FK',
    Fm = 'FM',
    Fo = 'FO',
    Fr = 'FR',
    Ga = 'GA',
    Gb = 'GB',
    Gd = 'GD',
    Ge = 'GE',
    Gf = 'GF',
    Gg = 'GG',
    Gh = 'GH',
    Gi = 'GI',
    Gl = 'GL',
    Gm = 'GM',
    Gn = 'GN',
    Gp = 'GP',
    Gq = 'GQ',
    Gr = 'GR',
    Gs = 'GS',
    Gt = 'GT',
    Gu = 'GU',
    Gw = 'GW',
    Gy = 'GY',
    Hk = 'HK',
    Hm = 'HM',
    Hn = 'HN',
    Hr = 'HR',
    Ht = 'HT',
    Hu = 'HU',
    Id = 'ID',
    Ie = 'IE',
    Il = 'IL',
    Im = 'IM',
    In = 'IN',
    Io = 'IO',
    Iq = 'IQ',
    Ir = 'IR',
    Is = 'IS',
    It = 'IT',
    Je = 'JE',
    Jm = 'JM',
    Jo = 'JO',
    Jp = 'JP',
    Ke = 'KE',
    Kg = 'KG',
    Kh = 'KH',
    Ki = 'KI',
    Km = 'KM',
    Kn = 'KN',
    Kp = 'KP',
    Kr = 'KR',
    Kw = 'KW',
    Ky = 'KY',
    Kz = 'KZ',
    La = 'LA',
    Lb = 'LB',
    Lc = 'LC',
    Li = 'LI',
    Lk = 'LK',
    Lr = 'LR',
    Ls = 'LS',
    Lt = 'LT',
    Lu = 'LU',
    Lv = 'LV',
    Ly = 'LY',
    Ma = 'MA',
    Mc = 'MC',
    Md = 'MD',
    Me = 'ME',
    Mf = 'MF',
    Mg = 'MG',
    Mh = 'MH',
    Mk = 'MK',
    Ml = 'ML',
    Mm = 'MM',
    Mn = 'MN',
    Mo = 'MO',
    Mp = 'MP',
    Mq = 'MQ',
    Mr = 'MR',
    Ms = 'MS',
    Mt = 'MT',
    Mu = 'MU',
    Mv = 'MV',
    Mw = 'MW',
    Mx = 'MX',
    My = 'MY',
    Mz = 'MZ',
    Na = 'NA',
    Nc = 'NC',
    Ne = 'NE',
    Nf = 'NF',
    Ng = 'NG',
    Ni = 'NI',
    Nl = 'NL',
    No = 'NO',
    Np = 'NP',
    Nr = 'NR',
    Nu = 'NU',
    Nz = 'NZ',
    Om = 'OM',
    Pa = 'PA',
    Pe = 'PE',
    Pf = 'PF',
    Pg = 'PG',
    Ph = 'PH',
    Pk = 'PK',
    Pl = 'PL',
    Pm = 'PM',
    Pn = 'PN',
    Pr = 'PR',
    Ps = 'PS',
    Pt = 'PT',
    Pw = 'PW',
    Py = 'PY',
    Qa = 'QA',
    Re = 'RE',
    Ro = 'RO',
    Rs = 'RS',
    Ru = 'RU',
    Rw = 'RW',
    Sa = 'SA',
    Sb = 'SB',
    Sc = 'SC',
    Sd = 'SD',
    Se = 'SE',
    Sg = 'SG',
    Sh = 'SH',
    Si = 'SI',
    Sj = 'SJ',
    Sk = 'SK',
    Sl = 'SL',
    Sm = 'SM',
    Sn = 'SN',
    So = 'SO',
    Sr = 'SR',
    Ss = 'SS',
    St = 'ST',
    Sv = 'SV',
    Sx = 'SX',
    Sy = 'SY',
    Sz = 'SZ',
    Tc = 'TC',
    Td = 'TD',
    Tf = 'TF',
    Tg = 'TG',
    Th = 'TH',
    Tj = 'TJ',
    Tk = 'TK',
    Tl = 'TL',
    Tm = 'TM',
    Tn = 'TN',
    To = 'TO',
    Tr = 'TR',
    Tt = 'TT',
    Tv = 'TV',
    Tw = 'TW',
    Tz = 'TZ',
    Ua = 'UA',
    Ug = 'UG',
    Um = 'UM',
    Us = 'US',
    Uy = 'UY',
    Uz = 'UZ',
    Va = 'VA',
    Vc = 'VC',
    Ve = 'VE',
    Vg = 'VG',
    Vi = 'VI',
    Vn = 'VN',
    Vu = 'VU',
    Wf = 'WF',
    Ws = 'WS',
    Ye = 'YE',
    Yt = 'YT',
    Za = 'ZA',
    Zm = 'ZM',
    Zw = 'ZW',
}

/** Currency Code */
export enum CurrencyCode {
    Adp = 'ADP',
    Aed = 'AED',
    Afa = 'AFA',
    Afn = 'AFN',
    Alk = 'ALK',
    All = 'ALL',
    Amd = 'AMD',
    Ang = 'ANG',
    Aoa = 'AOA',
    Aok = 'AOK',
    Aon = 'AON',
    Aor = 'AOR',
    Ara = 'ARA',
    Arl = 'ARL',
    Arm = 'ARM',
    Arp = 'ARP',
    Ars = 'ARS',
    Ats = 'ATS',
    Aud = 'AUD',
    Awg = 'AWG',
    Azm = 'AZM',
    Azn = 'AZN',
    Bad = 'BAD',
    Bam = 'BAM',
    Ban = 'BAN',
    Bbd = 'BBD',
    Bdt = 'BDT',
    Bec = 'BEC',
    Bef = 'BEF',
    Bel = 'BEL',
    Bgl = 'BGL',
    Bgm = 'BGM',
    Bgn = 'BGN',
    Bgo = 'BGO',
    Bhd = 'BHD',
    Bif = 'BIF',
    Bmd = 'BMD',
    Bnd = 'BND',
    Bob = 'BOB',
    Bol = 'BOL',
    Bop = 'BOP',
    Bov = 'BOV',
    Brb = 'BRB',
    Brc = 'BRC',
    Bre = 'BRE',
    Brl = 'BRL',
    Brn = 'BRN',
    Brr = 'BRR',
    Brz = 'BRZ',
    Bsd = 'BSD',
    Btn = 'BTN',
    Buk = 'BUK',
    Bwp = 'BWP',
    Byb = 'BYB',
    Byn = 'BYN',
    Byr = 'BYR',
    Bzd = 'BZD',
    Cad = 'CAD',
    Cdf = 'CDF',
    Che = 'CHE',
    Chf = 'CHF',
    Chw = 'CHW',
    Cle = 'CLE',
    Clf = 'CLF',
    Clp = 'CLP',
    Cnx = 'CNX',
    Cny = 'CNY',
    Cop = 'COP',
    Cou = 'COU',
    Crc = 'CRC',
    Csd = 'CSD',
    Csk = 'CSK',
    Cuc = 'CUC',
    Cup = 'CUP',
    Cve = 'CVE',
    Cyp = 'CYP',
    Czk = 'CZK',
    Ddm = 'DDM',
    Dem = 'DEM',
    Djf = 'DJF',
    Dkk = 'DKK',
    Dop = 'DOP',
    Dzd = 'DZD',
    Ecs = 'ECS',
    Ecv = 'ECV',
    Eek = 'EEK',
    Egp = 'EGP',
    Ern = 'ERN',
    Esa = 'ESA',
    Esb = 'ESB',
    Esp = 'ESP',
    Etb = 'ETB',
    Eur = 'EUR',
    Fim = 'FIM',
    Fjd = 'FJD',
    Fkp = 'FKP',
    Frf = 'FRF',
    Gbp = 'GBP',
    Gek = 'GEK',
    Gel = 'GEL',
    Ghc = 'GHC',
    Ghs = 'GHS',
    Gip = 'GIP',
    Gmd = 'GMD',
    Gnf = 'GNF',
    Gns = 'GNS',
    Gqe = 'GQE',
    Grd = 'GRD',
    Gtq = 'GTQ',
    Gwe = 'GWE',
    Gwp = 'GWP',
    Gyd = 'GYD',
    Hkd = 'HKD',
    Hnl = 'HNL',
    Hrd = 'HRD',
    Hrk = 'HRK',
    Htg = 'HTG',
    Huf = 'HUF',
    Idr = 'IDR',
    Iep = 'IEP',
    Ilp = 'ILP',
    Ilr = 'ILR',
    Ils = 'ILS',
    Inr = 'INR',
    Iqd = 'IQD',
    Irr = 'IRR',
    Isj = 'ISJ',
    Isk = 'ISK',
    Itl = 'ITL',
    Jmd = 'JMD',
    Jod = 'JOD',
    Jpy = 'JPY',
    Kes = 'KES',
    Kgs = 'KGS',
    Khr = 'KHR',
    Kmf = 'KMF',
    Kpw = 'KPW',
    Krh = 'KRH',
    Kro = 'KRO',
    Krw = 'KRW',
    Kwd = 'KWD',
    Kyd = 'KYD',
    Kzt = 'KZT',
    Lak = 'LAK',
    Lbp = 'LBP',
    Lkr = 'LKR',
    Lrd = 'LRD',
    Lsl = 'LSL',
    Ltl = 'LTL',
    Ltt = 'LTT',
    Luc = 'LUC',
    Luf = 'LUF',
    Lul = 'LUL',
    Lvl = 'LVL',
    Lvr = 'LVR',
    Lyd = 'LYD',
    Mad = 'MAD',
    Maf = 'MAF',
    Mcf = 'MCF',
    Mdc = 'MDC',
    Mdl = 'MDL',
    Mga = 'MGA',
    Mgf = 'MGF',
    Mkd = 'MKD',
    Mkn = 'MKN',
    Mlf = 'MLF',
    Mmk = 'MMK',
    Mnt = 'MNT',
    Mop = 'MOP',
    Mro = 'MRO',
    Mtl = 'MTL',
    Mtp = 'MTP',
    Mur = 'MUR',
    Mvp = 'MVP',
    Mvr = 'MVR',
    Mwk = 'MWK',
    Mxn = 'MXN',
    Mxp = 'MXP',
    Mxv = 'MXV',
    Myr = 'MYR',
    Mze = 'MZE',
    Mzm = 'MZM',
    Mzn = 'MZN',
    Nad = 'NAD',
    Ngn = 'NGN',
    Nic = 'NIC',
    Nio = 'NIO',
    Nlg = 'NLG',
    Nok = 'NOK',
    Npr = 'NPR',
    Nzd = 'NZD',
    Omr = 'OMR',
    Pab = 'PAB',
    Pei = 'PEI',
    Pen = 'PEN',
    Pes = 'PES',
    Pgk = 'PGK',
    Php = 'PHP',
    Pkr = 'PKR',
    Pln = 'PLN',
    Plz = 'PLZ',
    Pte = 'PTE',
    Pyg = 'PYG',
    Qar = 'QAR',
    Rhd = 'RHD',
    Rol = 'ROL',
    Ron = 'RON',
    Rsd = 'RSD',
    Rub = 'RUB',
    Rur = 'RUR',
    Rwf = 'RWF',
    Sar = 'SAR',
    Sbd = 'SBD',
    Scr = 'SCR',
    Sdd = 'SDD',
    Sdg = 'SDG',
    Sdp = 'SDP',
    Sek = 'SEK',
    Sgd = 'SGD',
    Shp = 'SHP',
    Sit = 'SIT',
    Skk = 'SKK',
    Sll = 'SLL',
    Sos = 'SOS',
    Srd = 'SRD',
    Srg = 'SRG',
    Ssp = 'SSP',
    Std = 'STD',
    Sur = 'SUR',
    Svc = 'SVC',
    Syp = 'SYP',
    Szl = 'SZL',
    Thb = 'THB',
    Tjr = 'TJR',
    Tjs = 'TJS',
    Tmm = 'TMM',
    Tmt = 'TMT',
    Tnd = 'TND',
    Top = 'TOP',
    Tpe = 'TPE',
    Trl = 'TRL',
    Try = 'TRY',
    Ttd = 'TTD',
    Twd = 'TWD',
    Tzs = 'TZS',
    Uah = 'UAH',
    Uak = 'UAK',
    Ugs = 'UGS',
    Ugx = 'UGX',
    Usd = 'USD',
    Usn = 'USN',
    Uss = 'USS',
    Uyi = 'UYI',
    Uyp = 'UYP',
    Uyu = 'UYU',
    Uzs = 'UZS',
    Veb = 'VEB',
    Vef = 'VEF',
    Vnd = 'VND',
    Vnn = 'VNN',
    Vuv = 'VUV',
    Wst = 'WST',
    Xaf = 'XAF',
    Xcd = 'XCD',
    Xeu = 'XEU',
    Xfo = 'XFO',
    Xfu = 'XFU',
    Xof = 'XOF',
    Xpf = 'XPF',
    Xre = 'XRE',
    Ydd = 'YDD',
    Yer = 'YER',
    Yud = 'YUD',
    Yum = 'YUM',
    Yun = 'YUN',
    Yur = 'YUR',
    Zal = 'ZAL',
    Zar = 'ZAR',
    Zmk = 'ZMK',
    Zmw = 'ZMW',
    Zrn = 'ZRN',
    Zrz = 'ZRZ',
    Zwd = 'ZWD',
    Zwl = 'ZWL',
    Zwr = 'ZWR',
}

/** Blog post sort */
export enum SortBy {
    Newest = 'NEWEST',
    Oldest = 'OLDEST',
}
