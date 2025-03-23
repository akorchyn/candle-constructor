// User-facing API endpoints

export async function fetchShopCandles(filters?: {
    minPrice?: number;
    maxPrice?: number;
    search?: string;
    categoryIds?: number[];
}) {
    // Build query string from filters
    const queryParams = new URLSearchParams();

    if (filters?.minPrice !== undefined) {
        queryParams.append('minPrice', filters.minPrice.toString());
    }

    if (filters?.maxPrice !== undefined) {
        queryParams.append('maxPrice', filters.maxPrice.toString());
    }

    if (filters?.search) {
        queryParams.append('search', filters.search);
    }

    if (filters?.categoryIds?.length) {
        queryParams.append('categoryIds', filters.categoryIds.join(','));
    }

    const queryString = queryParams.toString();
    const url = `/api/shop/candles${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch candles');
    return response.json();
}

export async function fetchCandleDetails(slug: string) {
    const response = await fetch(`/api/shop/candles/${slug}`);
    if (!response.ok) throw new Error('Failed to fetch candle details');
    return response.json();
}

export async function fetchCategories() {
    const response = await fetch('/api/shop/categories');
    if (!response.ok) throw new Error('Failed to fetch categories');
    return response.json();
}

// Cart-related functions
export type CartItem = {
    productId: number;
    quantity: number;
    name: string;
    price: number;
    imageUrl: string;
}

export async function addItemToCart(item: CartItem) {
    const response = await fetch('/api/shop/cart', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || 'Failed to add item to cart');
    }

    return response.json();
}

export async function getCart() {
    const response = await fetch('/api/shop/cart');
    if (!response.ok) throw new Error('Failed to fetch cart');
    return response.json();
}

export async function updateCartItem(productId: number, quantity: number) {
    const response = await fetch(`/api/shop/cart/${productId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
    });

    if (!response.ok) throw new Error('Failed to update cart item');
    return response.json();
}

export async function removeCartItem(productId: number) {
    const response = await fetch(`/api/shop/cart/${productId}`, {
        method: 'DELETE',
    });

    if (!response.ok) throw new Error('Failed to remove cart item');
    return response.json();
}

export async function fetchRelatedProducts(slug: string) {
    const response = await fetch(`/api/shop/candles/${slug}/related`);
    if (!response.ok) throw new Error('Failed to fetch related products');
    return response.json();
}

