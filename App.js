import React, {
    useEffect,
    useState
} from "react";
import "./App.css";
import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";
import axios from "axios";
import {
    Toaster
} from "./components/ui/sonner";
import {
    toast
} from "sonner";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Context for user and cart state
const AppContext = React.createContext();

export const useAppContext = () => React.useContext(AppContext);

// Components
const Header = ({
        user,
        onLogin,
        onLogout,
        cartItemsCount
    }) => {
        return ( <
            header className = "luxury-header" >
            <
            div className = "header-container" >
            <
            div className = "logo" >
            <
            h1 > LUXE < /h1> <
            span > BOUTIQUE < /span> <
            /div>

            <
            nav className = "nav-links" >
            <
            a href = "#home" > Home < /a> <
            a href = "#featured" > Featured < /a> <
            a href = "#dresses" > Dresses < /a> <
            a href = "#accessories" > Accessories < /a> <
            a href = "#shoes" > Shoes < /a> <
            /nav>

            <
            div className = "header-actions" >
            <
            div className = "search-icon" >
            <
            svg width = "20"
            height = "20"
            viewBox = "0 0 24 24"
            fill = "none"
            stroke = "currentColor"
            strokeWidth = "2" >
            <
            circle cx = "11"
            cy = "11"
            r = "8" > < /circle> <
            path d = "M21 21l-4.35-4.35" > < /path> <
            /svg> <
            /div>

            <
            div className = "cart-icon" >
            <
            svg width = "20"
            height = "20"
            viewBox = "0 0 24 24"
            fill = "none"
            stroke = "currentColor"
            strokeWidth = "2" >
            <
            path d = "M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" > < /path> <
            line x1 = "3"
            y1 = "6"
            x2 = "21"
            y2 = "6" > < /line> <
            path d = "M16 10a4 4 0 0 1-8 0" > < /path> <
            /svg> {
                cartItemsCount > 0 && < span className = "cart-count" > {
                        cartItemsCount
                    } < /span>} <
                    /div>

                {
                    user ? ( <
                        div className = "user-menu" >
                        <
                        img src = {
                            user.picture
                        }
                        alt = {
                            user.name
                        }
                        className = "user-avatar" / >
                        <
                        div className = "dropdown" >
                        <
                        span > {
                            user.name
                        } < /span> <
                        button onClick = {
                            onLogout
                        }
                        className = "logout-btn" > Logout < /button> <
                        /div> <
                        /div>
                    ) : ( <
                        button onClick = {
                            onLogin
                        }
                        className = "login-btn" > Sign In < /button>
                    )
                } <
                /div> <
                /div> <
                /header>
            );
        };

        const Hero = () => {
            return ( <
                section className = "hero-section"
                id = "home" >
                <
                div className = "hero-content" >
                <
                div className = "hero-text" >
                <
                h1 > Discover Luxury < /h1> <
                p > Curated collection of premium fashion
                for the discerning individual < /p> <
                button className = "cta-button" >
                Shop Collection <
                svg width = "16"
                height = "16"
                viewBox = "0 0 24 24"
                fill = "none"
                stroke = "currentColor"
                strokeWidth = "2" >
                <
                line x1 = "5"
                y1 = "12"
                x2 = "19"
                y2 = "12" > < /line> <
                polyline points = "12,5 19,12 12,19" > < /polyline> <
                /svg> <
                /button> <
                /div> <
                div className = "hero-image" >
                <
                img src = "https://images.unsplash.com/photo-1591884807235-1dc6c2e148b1?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NjZ8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9ufGVufDB8fHx8MTc1ODIwNzY3Mnww&ixlib=rb-4.1.0&q=85"
                alt = "Luxury Fashion" /
                >
                <
                /div> <
                /div> <
                /section>
            );
        };

        const ProductCard = ({
                product,
                onAddToCart
            }) => {
                const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
                const [selectedColor, setSelectedColor] = useState(product.colors[0]);

                const handleAddToCart = () => {
                    onAddToCart({
                        product_id: product.id,
                        quantity: 1,
                        size: selectedSize,
                        color: selectedColor
                    });
                };

                return ( <
                    div className = "product-card" >
                    <
                    div className = "product-image" >
                    <
                    img src = {
                        product.images[0]
                    }
                    alt = {
                        product.name
                    }
                    /> {
                        product.featured && < span className = "featured-badge" > Featured < /span>} <
                            /div>

                            <
                            div className = "product-info" >
                            <
                            h3 > {
                                product.name
                            } < /h3> <
                            p className = "product-description" > {
                                product.description
                            } < /p> <
                            div className = "product-price" > $ {
                                product.price
                            } < /div>

                            <
                            div className = "product-options" >
                            <
                            div className = "size-selector" >
                            <
                            label > Size: < /label> <
                            select value = {
                                selectedSize
                            }
                        onChange = {
                                (e) => setSelectedSize(e.target.value)
                            } > {
                                product.sizes.map(size => ( <
                                    option key = {
                                        size
                                    }
                                    value = {
                                        size
                                    } > {
                                        size
                                    } < /option>
                                ))
                            } <
                            /select> <
                            /div>

                            <
                            div className = "color-selector" >
                            <
                            label > Color: < /label> <
                            div className = "color-options" > {
                                product.colors.map(color => ( <
                                    button key = {
                                        color
                                    }
                                    className = {
                                        `color-option ${selectedColor === color ? 'selected' : ''}`
                                    }
                                    onClick = {
                                        () => setSelectedColor(color)
                                    }
                                    title = {
                                        color
                                    } >
                                    <
                                    span className = "color-dot"
                                    style = {
                                        {
                                            backgroundColor: color.toLowerCase()
                                        }
                                    } > < /span> <
                                    /button>
                                ))
                            } <
                            /div> <
                            /div> <
                            /div>

                            <
                            button onClick = {
                                handleAddToCart
                            }
                        className = "add-to-cart-btn" >
                            Add to Cart <
                            /button> <
                            /div> <
                            /div>
                    );
                };

                const ProductSection = ({
                    title,
                    products,
                    onAddToCart,
                    id
                }) => {
                    return ( <
                        section className = "product-section"
                        id = {
                            id
                        } >
                        <
                        div className = "section-header" >
                        <
                        h2 > {
                            title
                        } < /h2> <
                        div className = "section-line" > < /div> <
                        /div>

                        <
                        div className = "products-grid" > {
                            products.map(product => ( <
                                ProductCard key = {
                                    product.id
                                }
                                product = {
                                    product
                                }
                                onAddToCart = {
                                    onAddToCart
                                }
                                />
                            ))
                        } <
                        /div> <
                        /section>
                    );
                };

                const SearchBar = ({
                    onSearch,
                    searchTerm,
                    setSearchTerm
                }) => {
                    return ( <
                        div className = "search-section" >
                        <
                        div className = "search-container" >
                        <
                        input type = "text"
                        placeholder = "Search luxury fashion..."
                        value = {
                            searchTerm
                        }
                        onChange = {
                            (e) => setSearchTerm(e.target.value)
                        }
                        className = "search-input" /
                        >
                        <
                        button onClick = {
                            () => onSearch(searchTerm)
                        }
                        className = "search-button" >
                        <
                        svg width = "20"
                        height = "20"
                        viewBox = "0 0 24 24"
                        fill = "none"
                        stroke = "currentColor"
                        strokeWidth = "2" >
                        <
                        circle cx = "11"
                        cy = "11"
                        r = "8" > < /circle> <
                        path d = "M21 21l-4.35-4.35" > < /path> <
                        /svg> <
                        /button> <
                        /div> <
                        /div>
                    );
                };

                const Home = () => {
                    const [user, setUser] = useState(null);
                    const [products, setProducts] = useState([]);
                    const [featuredProducts, setFeaturedProducts] = useState([]);
                    const [dresses, setDresses] = useState([]);
                    const [accessories, setAccessories] = useState([]);
                    const [shoes, setShoes] = useState([]);
                    const [cart, setCart] = useState({
                        items: []
                    });
                    const [searchTerm, setSearchTerm] = useState("");
                    const [searchResults, setSearchResults] = useState([]);
                    const [loading, setLoading] = useState(true);

                    useEffect(() => {
                        initializeApp();
                    }, []);

                    useEffect(() => {
                        // Handle authentication from URL fragment
                        const handleAuth = async () => {
                            const fragment = window.location.hash;
                            if (fragment.includes('session_id=')) {
                                setLoading(true);
                                const sessionId = fragment.split('session_id=')[1].split('&')[0];

                                try {
                                    const response = await axios.get(`${API}/auth/session`, {
                                        headers: {
                                            'X-Session-ID': sessionId
                                        }
                                    });

                                    setUser(response.data.user);

                                    // Set session token cookie
                                    document.cookie = `session_token=${response.data.session_token}; path=/; secure; samesite=none; max-age=${7 * 24 * 60 * 60}`;

                                    // Clean URL
                                    window.history.replaceState({}, document.title, window.location.pathname);

                                    toast.success(`Welcome, ${response.data.user.name}!`);
                                } catch (error) {
                                    console.error('Auth error:', error);
                                    toast.error('Authentication failed');
                                }
                                setLoading(false);
                            } else {
                                // Check existing session
                                checkExistingSession();
                            }
                        };

                        handleAuth();
                    }, []);

                    const initializeApp = async () => {
                        try {
                            // Initialize sample data
                            await axios.post(`${API}/init-data`);

                            // Load products
                            await loadProducts();

                        } catch (error) {
                            console.error('Failed to initialize app:', error);
                        }
                    };

                    const checkExistingSession = async () => {
                        try {
                            const response = await axios.get(`${API}/auth/me`, {
                                withCredentials: true
                            });
                            setUser(response.data);
                        } catch (error) {
                            // Not authenticated, that's fine
                        }
                        setLoading(false);
                    };

                    const loadProducts = async () => {
                        try {
                            const [allProducts, featured, dressesData, accessoriesData, shoesData] = await Promise.all([
                                axios.get(`${API}/products`),
                                axios.get(`${API}/products?featured=true`),
                                axios.get(`${API}/products?category=Dresses`),
                                axios.get(`${API}/products?category=Accessories`),
                                axios.get(`${API}/products?category=Shoes`)
                            ]);

                            setProducts(allProducts.data);
                            setFeaturedProducts(featured.data);
                            setDresses(dressesData.data);
                            setAccessories(accessoriesData.data);
                            setShoes(shoesData.data);
                        } catch (error) {
                            console.error('Failed to load products:', error);
                            toast.error('Failed to load products');
                        }
                    };

                    const handleLogin = () => {
                        const redirectUrl = encodeURIComponent(window.location.origin);
                        window.location.href = `https://auth.emergentagent.com/?redirect=${redirectUrl}`;
                    };

                    const handleLogout = async () => {
                        try {
                            await axios.post(`${API}/auth/logout`, {}, {
                                withCredentials: true
                            });
                            setUser(null);
                            setCart({
                                items: []
                            });
                            toast.success('Logged out successfully');
                        } catch (error) {
                            console.error('Logout error:', error);
                        }
                    };

                    const handleAddToCart = async (item) => {
                        if (!user) {
                            toast.error('Please sign in to add items to cart');
                            return;
                        }

                        try {
                            await axios.post(`${API}/cart/add`, item, {
                                withCredentials: true
                            });
                            toast.success('Item added to cart');

                            // Refresh cart
                            const cartResponse = await axios.get(`${API}/cart`, {
                                withCredentials: true
                            });
                            setCart(cartResponse.data);
                        } catch (error) {
                            console.error('Add to cart error:', error);
                            toast.error('Failed to add item to cart');
                        }
                    };

                    const handleSearch = async (term) => {
                        if (!term.trim()) {
                            setSearchResults([]);
                            return;
                        }

                        try {
                            const response = await axios.get(`${API}/products?search=${encodeURIComponent(term)}`);
                            setSearchResults(response.data);
                        } catch (error) {
                            console.error('Search error:', error);
                            toast.error('Search failed');
                        }
                    };

                    const cartItemsCount = cart.items.reduce((total, item) => total + item.quantity, 0);

                    if (loading) {
                        return ( <
                            div className = "loading-screen" >
                            <
                            div className = "loading-spinner" > < /div> <
                            p > Loading luxury experience... < /p> <
                            /div>
                        );
                    }

                    return ( <
                        AppContext.Provider value = {
                            {
                                user,
                                cart,
                                setCart
                            }
                        } >
                        <
                        div className = "App" >
                        <
                        Header user = {
                            user
                        }
                        onLogin = {
                            handleLogin
                        }
                        onLogout = {
                            handleLogout
                        }
                        cartItemsCount = {
                            cartItemsCount
                        }
                        />

                        <
                        main >
                        <
                        Hero / >

                        <
                        SearchBar onSearch = {
                            handleSearch
                        }
                        searchTerm = {
                            searchTerm
                        }
                        setSearchTerm = {
                            setSearchTerm
                        }
                        />

                        {
                            searchResults.length > 0 && ( <
                                ProductSection title = "Search Results"
                                products = {
                                    searchResults
                                }
                                onAddToCart = {
                                    handleAddToCart
                                }
                                id = "search-results" /
                                >
                            )
                        }

                        <
                        ProductSection title = "Featured Collection"
                        products = {
                            featuredProducts
                        }
                        onAddToCart = {
                            handleAddToCart
                        }
                        id = "featured" /
                        >

                        <
                        ProductSection title = "Elegant Dresses"
                        products = {
                            dresses
                        }
                        onAddToCart = {
                            handleAddToCart
                        }
                        id = "dresses" /
                        >

                        <
                        ProductSection title = "Luxury Accessories"
                        products = {
                            accessories
                        }
                        onAddToCart = {
                            handleAddToCart
                        }
                        id = "accessories" /
                        >

                        <
                        ProductSection title = "Designer Shoes"
                        products = {
                            shoes
                        }
                        onAddToCart = {
                            handleAddToCart
                        }
                        id = "shoes" /
                        >
                        <
                        /main>

                        <
                        footer className = "luxury-footer" >
                        <
                        div className = "footer-content" >
                        <
                        div className = "footer-section" >
                        <
                        h3 > LUXE BOUTIQUE < /h3> <
                        p > Curating luxury fashion
                        for the discerning individual < /p> <
                        /div> <
                        div className = "footer-section" >
                        <
                        h4 > Customer Service < /h4> <
                        p > Contact Us < /p> <
                        p > Size Guide < /p> <
                        p > Returns & Exchanges < /p> <
                        /div> <
                        div className = "footer-section" >
                        <
                        h4 > Company < /h4> <
                        p > About Us < /p> <
                        p > Careers < /p> <
                        p > Press < /p> <
                        /div> <
                        /div> <
                        div className = "footer-bottom" >
                        <
                        p > & copy; 2024 Luxe Boutique.All rights reserved. < /p> <
                        /div> <
                        /footer>

                        <
                        Toaster / >
                        <
                        /div> <
                        /AppContext.Provider>
                    );
                };

                function App() {
                    return ( <
                        BrowserRouter >
                        <
                        Routes >
                        <
                        Route path = "/"
                        element = { < Home / >
                        }
                        /> <
                        Route path = "*"
                        element = { < Navigate to = "/"
                            replace / >
                        }
                        /> <
                        /Routes> <
                        /BrowserRouter>
                    );
                }

                export default App;