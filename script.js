/**
 * script.js
 * Handles the logic for Saraswati Library Website
 * Enhanced with Age Group filtering, Modal book reading, Improved Chatbot, Ratings, and Payments
 */

// ==========================================
// 1. DATA: Books Categorized by Age Group with Ratings, Images, and Reviews
// ==========================================
const mockBooks = [
    // CHILDREN (0-12)
    { id: 1, title: "Panchatantra Tales", author: "Vishnu Sharma", category: "Fables", ageGroup: "children", ageLabel: "Children (0-12)", image: "https://m.media-amazon.com/images/I/81xIQv0c75L._AC_UF1000,1000_QL80_.jpg", rating: 4.8, description: "An ancient Indian collection of interrelated animal fables in Sanskrit verse and prose.", excerpt: "\"There is no friend like a true friend, and no enemy like an enemy disguised as a friend...\"", reviews: [{ user: "Aditi S.", text: "Beautifully written morals for kids!" }, { user: "Rahul M.", text: "My 6-year-old loves the animal stories." }] },
    { id: 2, title: "Amar Chitra Katha: Krishna", author: "Anant Pai", category: "Illustrated Myth", ageGroup: "children", ageLabel: "Children (0-12)", image: "https://m.media-amazon.com/images/I/91eK6g22Y-L._AC_UF1000,1000_QL80_.jpg", rating: 4.9, description: "The story of Lord Krishna's childhood, told through beautiful illustrations.", excerpt: "\"Even as a child in Vrindavan, his mischievous smile and enchanting lute playing stole the hearts...\"", reviews: [{ user: "Neha K.", text: "The illustrations are a masterpiece." }, { user: "Vijay P.", text: "Great introduction to Indian mythology." }] },
    { id: 9, title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", category: "Fantasy", ageGroup: "children", ageLabel: "Children (0-12)", image: "https://m.media-amazon.com/images/I/81iqZ2HHD-L._AC_UF1000,1000_QL80_.jpg", rating: 5.0, description: "The classic tale of the boy who lived. Discover entering the magical world of Hogwarts.", excerpt: "\"It does not do to dwell on dreams and forget to live.\"", reviews: [{ user: "Sara W.", text: "A magical classic that never gets old." }, { user: "Tom H.", text: "Perfect fantasy book for all ages." }] },
    { id: 13, title: "The Jungle Book", author: "Rudyard Kipling", category: "Adventure", ageGroup: "children", ageLabel: "Children (0-12)", image: "https://m.media-amazon.com/images/I/71+G1LutWOL._AC_UF1000,1000_QL80_.jpg", rating: 4.7, description: "The adventures of Mowgli, a boy raised by wolves in the Indian jungle.", excerpt: "\"For the strength of the Pack is the Wolf, and the strength of the Wolf is the Pack.\"", reviews: [{ user: "Emma R.", text: "Thrilling and fun adventure!" }] },
    { id: 14, title: "Alice's Adventures in Wonderland", author: "Lewis Carroll", category: "Fantasy", ageGroup: "children", ageLabel: "Children (0-12)", image: "https://m.media-amazon.com/images/I/81Mog-If4XL._AC_UF1000,1000_QL80_.jpg", rating: 4.6, description: "A young girl named Alice falls through a rabbit hole into a fantasy world.", excerpt: "\"Curiouser and curiouser!\"", reviews: [{ user: "Lucy B.", text: "Bizarre, imaginative, and brilliant." }] },
    { id: 15, title: "Matilda", author: "Roald Dahl", category: "Fiction", ageGroup: "children", ageLabel: "Children (0-12)", image: "https://m.media-amazon.com/images/I/81PjPUZ0DNL._AC_UF1000,1000_QL80_.jpg", rating: 4.8, description: "The story of a sweet, bright little girl named Matilda, who is a child of wondrous intelligence.", excerpt: "\"Never do anything by halves if you want to get away with it.\"", reviews: [{ user: "Mark D.", text: "A wonderful story of a brilliant child." }] },
    { id: 16, title: "Winnie-the-Pooh", author: "A.A. Milne", category: "Classic", ageGroup: "children", ageLabel: "Children (0-12)", image: "https://m.media-amazon.com/images/I/81lS9t0MHDL._AC_UF1000,1000_QL80_.jpg", rating: 4.9, description: "Follow the adventures of Pooh, Piglet, and friends in the Hundred Acre Wood.", excerpt: "\"A little consideration, a little thought for others, makes all the difference.\"", reviews: [{ user: "Sarah P.", text: "So gentle and heartwarming." }] },
    { id: 17, title: "Charlotte's Web", author: "E.B. White", category: "Fiction", ageGroup: "children", ageLabel: "Children (0-12)", image: "https://m.media-amazon.com/images/I/81d4yXF2ZfL._AC_UF1000,1000_QL80_.jpg", rating: 4.8, description: "The story of a pig named Wilbur and his devoted friend Charlotte, the spider.", excerpt: "\"You have been my friend. That in itself is a tremendous thing.\"", reviews: [{ user: "John F.", text: "A beautiful story of friendship." }] },
    { id: 18, title: "The Lion, the Witch and the Wardrobe", author: "C.S. Lewis", category: "Fantasy", ageGroup: "children", ageLabel: "Children (0-12)", image: "https://m.media-amazon.com/images/I/81s4R2vBkhL._AC_UF1000,1000_QL80_.jpg", rating: 4.7, description: "Four siblings step through a wardrobe into the magical land of Narnia.", excerpt: "\"To the glistening eastern sea, I give you Queen Lucy the Valiant.\"", reviews: [{ user: "Peter C.", text: "A timeless portal fantasy." }] },
    { id: 19, title: "Malgudi Schooldays", author: "R.K. Narayan", category: "Fiction", ageGroup: "children", ageLabel: "Children (0-12)", image: "https://m.media-amazon.com/images/I/81e5oBpxC8L._AC_UF1000,1000_QL80_.jpg", rating: 4.6, description: "The timeless adventures of Swami and his friends.", excerpt: "\"He shuddered at the very thought of school...\"", reviews: [{ user: "Karthik R.", text: "Reminds me of my own childhood." }] },

    // TEENS (13-18)
    { id: 3, title: "Malgudi Days", author: "R. K. Narayan", category: "Short Stories", ageGroup: "teens", ageLabel: "Teens (13-18)", image: "https://m.media-amazon.com/images/I/71Xm3Q+-4DL._AC_UF1000,1000_QL80_.jpg", rating: 4.6, description: "A collection of short stories set in the fictional town of Malgudi.", excerpt: "\"The Edge of the World... It was only a small town, but for Swami, it was the entire universe.\"", reviews: [{ user: "Meera S.", text: "Paints a vivid picture of rural India." }] },
    { id: 4, title: "The Mahabharata (Abridged)", author: "C. Rajagopalachari", category: "Mythology", ageGroup: "teens", ageLabel: "Teens (13-18)", image: "https://m.media-amazon.com/images/I/81z3T-Fw5fL._AC_UF1000,1000_QL80_.jpg", rating: 4.7, description: "A beautifully translated and abridged version of the great Indian epic.", excerpt: "\"Dharma is subtle. What is right in one circumstance may be wrong in another...\"", reviews: [{ user: "Arjun V.", text: "An excellent abridged edition." }] },
    { id: 10, title: "Harry Potter and the Goblet of Fire", author: "J.K. Rowling", category: "Fantasy", ageGroup: "teens", ageLabel: "Teens (13-18)", image: "https://m.media-amazon.com/images/I/810jKiNChxL._AC_UF1000,1000_QL80_.jpg", rating: 4.9, description: "Harry faces the Triwizard Tournament as dark forces gather in the shadows.", excerpt: "\"We are only as strong as we are united, as weak as we are divided.\"", reviews: [{ user: "Chloe M.", text: "The series gets beautifully dark here." }] },
    { id: 11, title: "A Brief History of Time", author: "Stephen Hawking", category: "Science", ageGroup: "teens", ageLabel: "Teens (13-18)", image: "https://m.media-amazon.com/images/I/81Mv2k1kKnL._AC_UF1000,1000_QL80_.jpg", rating: 4.8, description: "A landmark volume in science writing that explores the profound questions regarding the universe.", excerpt: "\"If we do discover a complete theory, it should in time be understandable...\"", reviews: [{ user: "Rajesh K.", text: "Mind-expanding completely." }] },
    { id: 20, title: "The Hunger Games", author: "Suzanne Collins", category: "Dystopian", ageGroup: "teens", ageLabel: "Teens (13-18)", image: "https://m.media-amazon.com/images/I/61I24wOsn8L._AC_UF1000,1000_QL80_.jpg", rating: 4.7, description: "In a dystopian future, teens are forced to compete in a televised death match.", excerpt: "\"May the odds be ever in your favor.\"", reviews: [{ user: "Kat B.", text: "Couldn't put it down." }] },
    { id: 21, title: "To Kill a Mockingbird", author: "Harper Lee", category: "Classic", ageGroup: "teens", ageLabel: "Teens (13-18)", image: "https://m.media-amazon.com/images/I/81gepf1eMqL._AC_UF1000,1000_QL80_.jpg", rating: 4.9, description: "A story of racial injustice and the destruction of childhood innocence.", excerpt: "\"You never really understand a person until you consider things from his point of view...\"", reviews: [{ user: "David S.", text: "Truly an absolute classic." }] },
    { id: 22, title: "The Fault in Our Stars", author: "John Green", category: "Romance", ageGroup: "teens", ageLabel: "Teens (13-18)", image: "https://m.media-amazon.com/images/I/81a4kCNuH+L._AC_UF1000,1000_QL80_.jpg", rating: 4.6, description: "Two teenage cancer patients embark on a journey to visit a reclusive author.", excerpt: "\"Some infinities are bigger than other infinities.\"", reviews: [{ user: "Anna G.", text: "Heartbreakingly beautiful." }] },
    { id: 23, title: "Percy Jackson & the Olympians", author: "Rick Riordan", category: "Fantasy", ageGroup: "teens", ageLabel: "Teens (13-18)", image: "https://m.media-amazon.com/images/I/91tnt+p-pAL._AC_UF1000,1000_QL80_.jpg", rating: 4.8, description: "A teenager discovers he is the descendant of a Greek god.", excerpt: "\"If my life is going to mean anything, I have to live it myself.\"", reviews: [{ user: "Leo V.", text: "Greek mythology made incredibly fun!" }] },
    { id: 24, title: "I Am Malala", author: "Malala Yousafzai", category: "Biography", ageGroup: "teens", ageLabel: "Teens (13-18)", image: "https://m.media-amazon.com/images/I/81-0T1K94xL._AC_UF1000,1000_QL80_.jpg", rating: 4.7, description: "The girl who stood up for education and was shot by the Taliban.", excerpt: "\"One child, one teacher, one book, one pen can change the world.\"", reviews: [{ user: "Sonia A.", text: "So inspiring and powerful." }] },
    { id: 25, title: "The Book Thief", author: "Markus Zusak", category: "Historical Fiction", ageGroup: "teens", ageLabel: "Teens (13-18)", image: "https://m.media-amazon.com/images/I/91JGwQlnuIG._AC_UF1000,1000_QL80_.jpg", rating: 4.8, description: "A story narrated by Death about a young girl in Nazi Germany.", excerpt: "\"I have hated words and I have loved them, and I hope I have made them right.\"", reviews: [{ user: "Hans M.", text: "Unique perspective and emotionally devastating." }] },

    // ADULTS (18+)
    { id: 5, title: "The Discovery of India", author: "Jawaharlal Nehru", category: "History", ageGroup: "adults", ageLabel: "Adults (18+)", image: "https://m.media-amazon.com/images/I/81O3E99o72L._AC_UF1000,1000_QL80_.jpg", rating: 4.5, description: "Traces India's history spanning from the Indus Valley Civilization to the ultimate British empire.", excerpt: "\"India is a myth and an idea, a dream and a vision...\"", reviews: [{ user: "Aman T.", text: "Profound and beautifully written." }] },
    { id: 6, title: "Arthashastra", author: "Chanakya", category: "Treatise", ageGroup: "adults", ageLabel: "Adults (18+)", image: "https://m.media-amazon.com/images/I/91n0I2x1bYL._AC_UF1000,1000_QL80_.jpg", rating: 4.3, description: "An ancient Indian Sanskrit treatise on statecraft, economic policy and military strategy.", excerpt: "\"In the happiness of his subjects lies the king's happiness...\"", reviews: [{ user: "Deepak L.", text: "Timeless political wisdom." }] },
    { id: 7, title: "Gitanjali", author: "Rabindranath Tagore", category: "Poetry", ageGroup: "adults", ageLabel: "Adults (18+)", image: "https://m.media-amazon.com/images/I/81X68pQ9zKL._AC_UF1000,1000_QL80_.jpg", rating: 4.8, description: "A collection of poems by the Bengali poet Rabindranath Tagore, for which he won the Nobel Prize.", excerpt: "\"Where the mind is without fear and the head is held high...\"", reviews: [{ user: "Smit P.", text: "Soul-stirring poetry." }] },
    { id: 8, title: "Midnight's Children", author: "Salman Rushdie", category: "Magical Realism", ageGroup: "adults", ageLabel: "Adults (18+)", image: "https://m.media-amazon.com/images/I/91A20K64YqL._AC_UF1000,1000_QL80_.jpg", rating: 4.4, description: "An epic novel that deals with India's transition from colonialism to independence.", excerpt: "\"I was born in the city of Bombay... once upon a time.\"", reviews: [{ user: "Nikhil C.", text: "A masterful dive into modern Indian history via magical realism." }] },
    { id: 12, title: "Cosmos", author: "Carl Sagan", category: "Science", ageGroup: "adults", ageLabel: "Adults (18+)", image: "https://m.media-amazon.com/images/I/81Q6Wew9kNL._AC_UF1000,1000_QL80_.jpg", rating: 5.0, description: "Carl Sagan's iconic book explaining fourteen billion years of cosmic evolution.", excerpt: "\"We are a way for the cosmos to know itself.\"", reviews: [{ user: "Rohan D.", text: "One of the absolute greatest science books ever written." }] },
    { id: 26, title: "The God of Small Things", author: "Arundhati Roy", category: "Fiction", ageGroup: "adults", ageLabel: "Adults (18+)", image: "https://m.media-amazon.com/images/I/A1p+D8hIomL._AC_UF1000,1000_QL80_.jpg", rating: 4.6, description: "A story about the childhood experiences of fraternal twins in Kerala.", excerpt: "\"That's what careless words do. They make people love you a little less.\"", reviews: [{ user: "Maya F.", text: "Lyrical and devastatingly beautiful." }] },
    { id: 27, title: "Sapiens: A Brief History of Humankind", author: "Yuval Noah Harari", category: "Non-Fiction", ageGroup: "adults", ageLabel: "Adults (18+)", image: "https://m.media-amazon.com/images/I/713jIoMO3UL._AC_UF1000,1000_QL80_.jpg", rating: 4.8, description: "An exploration of human history from the Stone Age to the modern era.", excerpt: "\"History is something that very few people have been doing...\"", reviews: [{ user: "Samir G.", text: "Completely changes how you view human history." }] },
    { id: 28, title: "1984", author: "George Orwell", category: "Dystopian", ageGroup: "adults", ageLabel: "Adults (18+)", image: "https://m.media-amazon.com/images/I/61ZewDE3beL._AC_UF1000,1000_QL80_.jpg", rating: 4.9, description: "A dystopian social science fiction novel and cautionary tale.", excerpt: "\"War is peace. Freedom is slavery. Ignorance is strength.\"", reviews: [{ user: "Oliver T.", text: "Terrifyingly relevant even today." }] },
    { id: 29, title: "The Alchemist", author: "Paulo Coelho", category: "Fiction", ageGroup: "adults", ageLabel: "Adults (18+)", image: "https://m.media-amazon.com/images/I/71aFt4+OTOL._AC_UF1000,1000_QL80_.jpg", rating: 4.7, description: "A young Andalusian shepherd travels to the pyramids of Egypt to find a treasure.", excerpt: "\"And, when you want something, all the universe conspires in helping you to achieve it.\"", reviews: [{ user: "Jane W.", text: "A life-affirming philosophical journey." }] },
    { id: 30, title: "The White Tiger", author: "Aravind Adiga", category: "Fiction", ageGroup: "adults", ageLabel: "Adults (18+)", image: "https://m.media-amazon.com/images/I/81PjPUZ0DNL._AC_UF1000,1000_QL80_.jpg", rating: 4.5, description: "A dark, humorous perspective of India's class struggle in a globalized world.", excerpt: "\"Let animals live like animals; let humans live like humans.\"", reviews: [{ user: "Karan B.", text: "Riveting, funny, and deeply cynical." }] }
];

// Helper Function: Generate Star Ratings HTML
function getStarHTML(rating) {
    let html = '';
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < 5; i++) {
        if (i < fullStars) {
            html += '<i class="fa-solid fa-star"></i>';
        } else if (i === fullStars && halfStar) {
            html += '<i class="fa-solid fa-star-half-stroke"></i>';
        } else {
            html += '<i class="fa-regular fa-star"></i>';
        }
    }
    return html + ` <span style="color:#666;font-size:0.8rem;margin-left:5px;">${rating.toFixed(1)}</span>`;
}


// ==========================================
// 2. UI: Render and Filter Books
// ==========================================
const bookGrid = document.getElementById('bookGrid');
const filterBtns = document.querySelectorAll('.filter-btn');

// Initial Render
document.addEventListener('DOMContentLoaded', () => {
    renderBooks('all');
});

// Filter Function
function renderBooks(ageFilter) {
    bookGrid.innerHTML = '';
    
    const filteredBooks = ageFilter === 'all' 
        ? mockBooks 
        : mockBooks.filter(b => b.ageGroup === ageFilter);

    filteredBooks.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <div class="book-cover" style="background-image: url('${book.image}'); background-size: cover; background-position: center;">
                <span class="age-tag">${book.ageGroup}</span>
                <span class="category-tag">${book.category}</span>
                <!-- Replaced icon with background cover image -->
            </div>
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">${book.author}</p>
                <div class="book-rating">${getStarHTML(book.rating)}</div>
                <button class="read-btn" onclick="openBookModal(${book.id})">View Book</button>
            </div>
        `;
        bookGrid.appendChild(bookCard);
    });
}

// Add click events to filters
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const age = btn.getAttribute('data-age');
        renderBooks(age);
    });
});

// Search function (Basic)
function handleSearch() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    
    bookGrid.innerHTML = '';
    const searchResults = mockBooks.filter(b => 
        b.title.toLowerCase().includes(query) || 
        b.author.toLowerCase().includes(query) ||
        b.category.toLowerCase().includes(query)
    );

    if (searchResults.length === 0) {
        bookGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #666;">No books found matching your search. Try another keyword!</p>';
        return;
    }

    searchResults.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <div class="book-cover" style="background-image: url('${book.image}'); background-size: cover; background-position: center;">
                <span class="age-tag">${book.ageGroup}</span>
                <span class="category-tag">${book.category}</span>
                <!-- Replaced icon with background cover image -->
            </div>
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">${book.author}</p>
                <div class="book-rating">${getStarHTML(book.rating)}</div>
                <button class="read-btn" onclick="openBookModal(${book.id})">View Book</button>
            </div>
        `;
        bookGrid.appendChild(bookCard);
    });
}

// ==========================================
// 3. UI: Modal Book Reader & Payment Logic
// ==========================================
const modalOverlay = document.getElementById('bookModal');
const closeModalBtn = document.getElementById('closeModalBtn');

function openBookModal(bookId) {
    const book = mockBooks.find(b => b.id === bookId);
    if (!book) return;

    // Populate modal data
    document.getElementById('modalTitle').innerText = book.title;
    document.getElementById('modalAuthor').innerText = book.author;
    document.getElementById('modalAgeGroup').innerText = book.ageLabel;
    document.getElementById('modalCategory').innerText = book.category;
    document.getElementById('modalRating').innerHTML = getStarHTML(book.rating);
    document.getElementById('modalDescription').innerText = book.description;
    document.getElementById('modalExcerpt').innerText = book.excerpt;
    
    // Build Customer Reviews
    const reviewsHtml = book.reviews.map(rev => `
        <div class="review-item">
            <strong><i class="fa-solid fa-user-circle"></i> ${rev.user}</strong>
            <p>"${rev.text}"</p>
        </div>
    `).join('');
    document.getElementById('reviewsContainer').innerHTML = reviewsHtml;
    
    // Reset payment styling on re-open
    const btn = document.getElementById('downloadBtn');
    btn.innerText = "Pay ₹149 & Download PDF";
    btn.style.backgroundColor = "var(--saffron)";
    btn.disabled = false;

    // Remove icon since we now rely on real covers, or instead show the cover in modal!
    const iconContainer = document.querySelector('.modal-icon');
    iconContainer.innerHTML = `<div style="width: 60px; height: 80px; background-image: url('${book.image}'); background-size: cover; background-position: center; border-radius: 4px; box-shadow: 0 4px 10px rgba(0,0,0,0.2);"></div>`;

    // Show modal
    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeBookModal() {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
}

closeModalBtn.addEventListener('click', closeBookModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeBookModal();
});

// Mock Payment Gateway Logic
function initiatePayment() {
    const btn = document.getElementById('downloadBtn');
    btn.innerText = "Processing Payment...";
    btn.disabled = true;
    btn.style.backgroundColor = "#555";

    // Simulate payment process delay
    setTimeout(() => {
        const confirmation = confirm("Payment Gateway: Confirm payment of ₹149?");
        if (confirmation) {
            btn.innerText = "Payment Successful! Downloading PDF...";
            btn.style.backgroundColor = "#4CAF50"; // Green
            alert("Payment of ₹149 received. Your PDF is now generating and will download shortly. Thank you for supporting Saraswati Library!");
        } else {
            btn.innerText = "Pay ₹149 & Download PDF";
            btn.disabled = false;
            btn.style.backgroundColor = "var(--saffron)";
            alert("Payment cancelled.");
        }
    }, 1500);
}


// ==========================================
// 4. REGISTRATION, LOGIN & DYNAMIC UI LOGIC
// ==========================================
let currentUser = null; // Stores user data after login

const authNavContainer = document.getElementById('authNavContainer');
const loginModal = document.getElementById('loginModal');
const registerModal = document.getElementById('registerModal');

// Buttons & Links
const openLoginBtn = document.getElementById('openLoginBtn'); // Recreated dynamically later
const closeLoginBtn = document.getElementById('closeLoginBtn');
const closeRegisterBtn = document.getElementById('closeRegisterBtn');
const openRegisterLink = document.getElementById('openRegisterLink');
const backToLoginLink = document.getElementById('backToLoginLink');

// Forms
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');

// Logic: Modals
function openLogin() {
    registerModal.classList.remove('active');
    loginModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeLogin() {
    loginModal.classList.remove('active');
    document.body.style.overflow = '';
}
function openRegister() {
    loginModal.classList.remove('active');
    registerModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}
function closeRegister() {
    registerModal.classList.remove('active');
    document.body.style.overflow = '';
}

// Initial Listener bindings
// We use event delegation since the login button might be replaced by a logout button
document.addEventListener('click', (e) => {
    if (e.target.closest('#openLoginBtn')) openLogin();
    if (e.target.closest('#logoutBtn')) performLogout();
});

closeLoginBtn.addEventListener('click', closeLogin);
closeRegisterBtn.addEventListener('click', closeRegister);
openRegisterLink.addEventListener('click', (e) => { e.preventDefault(); openRegister(); });
backToLoginLink.addEventListener('click', (e) => { e.preventDefault(); openLogin(); });

[loginModal, registerModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeLogin();
            closeRegister();
        }
    });
});

// Update UI State based on User
function updateUserUI() {
    if (currentUser) {
        // Logged In State
        authNavContainer.innerHTML = `
            <div style="display:flex; align-items:center; gap: 1rem;">
                <span style="font-weight: 500; color: var(--peacock);">Hi, ${currentUser.firstName}!</span>
                <button class="login-nav-btn logout-btn" id="logoutBtn" style="border-color: #555; color: #555;">Logout</button>
            </div>
        `;
        
        // Show Recommendations!
        document.getElementById('recommendationsSection').classList.remove('hidden');
        renderRecommendations();
        
    } else {
        // Logged Out State
        authNavContainer.innerHTML = `<button class="login-nav-btn" id="openLoginBtn"><i class="fa-solid fa-user"></i> Login</button>`;
        document.getElementById('recommendationsSection').classList.add('hidden');
    }
}

// Recommendations Logic based on User Age
function renderRecommendations() {
    const recGrid = document.getElementById('recommendedGrid');
    recGrid.innerHTML = '';
    
    let targetGroup = "adults";
    if (currentUser.age <= 12) targetGroup = "children";
    else if (currentUser.age <= 18) targetGroup = "teens";
    
    // Get top 4 books for their age group
    const recommendations = mockBooks.filter(b => b.ageGroup === targetGroup).slice(0, 4);
    
    recommendations.forEach(book => {
        const bookCard = document.createElement('div');
        bookCard.className = 'book-card';
        bookCard.innerHTML = `
            <div class="book-cover" style="background-image: url('${book.image}'); background-size: cover; background-position: center;">
                <span class="age-tag" style="background:var(--peacock)">Recommended</span>
                <span class="category-tag">${book.category}</span>
            </div>
            <div class="book-info">
                <h3 class="book-title">${book.title}</h3>
                <p class="book-author">${book.author}</p>
                <div class="book-rating">${getStarHTML(book.rating)}</div>
                <button class="read-btn" style="background:var(--peacock); color:white;" onclick="openBookModal(${book.id})">View Book</button>
            </div>
        `;
        recGrid.appendChild(bookCard);
    });
}

// Perform Logout
function performLogout() {
    currentUser = null;
    updateUserUI();
    alert("You have been successfully logged out. See you next time!");
}

// Handle Login Form
loginForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
    const username = document.getElementById('username').value;
    
    const submitBtn = loginForm.querySelector('.login-submit-btn');
    submitBtn.innerText = "Authenticating...";
    
    setTimeout(() => {
        closeLogin();
        loginForm.reset();
        submitBtn.innerText = "Sign In";
        
        // Fake logged in user data (assuming they are an adult if they bypass register)
        currentUser = { firstName: username.split('@')[0], age: 25 }; 
        updateUserUI();
        alert(`Welcome back, ${currentUser.firstName}!`);
    }, 1200);
});

// Handle Register Form
registerForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
    const fName = document.getElementById('firstName').value;
    const lName = document.getElementById('lastName').value;
    const email = document.getElementById('regEmail').value;
    const age = parseInt(document.getElementById('age').value);
    
    const submitBtn = registerForm.querySelector('.login-submit-btn');
    submitBtn.innerText = "Creating Account...";
    
    setTimeout(() => {
        closeRegister();
        registerForm.reset();
        submitBtn.innerText = "Create Account";
        
        // Set new user payload
        currentUser = { firstName: fName, lastName: lName, email: email, age: age };
        updateUserUI();
        alert(`Registration successful! Welcome to Sarasota, ${fName}!`);
    }, 1500);
});

// ==========================================
// 5. IMPROVED CHATBOT LOGIC (Friendly & Contextual)
// ==========================================
const chatWindow = document.getElementById('chatWindow');
const chatToggleBtn = document.getElementById('chatToggleBtn');
const closeChatBtn = document.getElementById('closeChatBtn');
const chatInput = document.getElementById('chatInput');
const sendMessageBtn = document.getElementById('sendMessageBtn');
const chatMessages = document.getElementById('chatMessages');
const chatIcon = document.querySelector('.chat-icon');

function toggleChat() {
    const isHidden = chatWindow.classList.contains('hidden');
    if (isHidden) {
        chatWindow.classList.remove('hidden');
        chatToggleBtn.classList.add('active');
        chatIcon.classList.remove('fa-message');
        chatIcon.classList.add('fa-times');
        setTimeout(() => chatInput.focus(), 300);
    } else {
        chatWindow.classList.add('hidden');
        chatToggleBtn.classList.remove('active');
        chatIcon.classList.remove('fa-times');
        chatIcon.classList.add('fa-message');
    }
}

chatToggleBtn.addEventListener('click', toggleChat);
closeChatBtn.addEventListener('click', toggleChat);

// Enhanced Bot Responses
const botResponses = [
    { 
        keywords: ["hi", "hello", "namaste", "hey", "friendly"], 
        response: "Namaste! ✨ Oh, I am so glad you're here. Welcome to the Saraswati Library! I can help you find books across genres, from science and fantasy like Harry Potter to ancient epics. What catches your interest today?" 
    },
    { 
        keywords: ["children", "kid", "child", "young", "0-12"], 
        response: "Oh, children's books are a joy! We have magical adventures like 'Harry Potter and the Sorcerer's Stone', alongside classics like 'Panchatantra Tales'. Would you like me to help you find them?" 
    },
    { 
        keywords: ["teen", "young adult", "13-18", "high school"], 
        response: "Teens have some of the best reads! I highly recommend checking out 'Harry Potter and the Goblet of Fire' for some fantasy, or 'A Brief History of Time' if they are feeling curious about the universe!" 
    },
    { 
        keywords: ["adult", "18+", "history", "philosophy", "complex"], 
        response: "For adults, we have brilliant literature and science. You can't miss Carl Sagan's 'Cosmos' or Nehru's 'The Discovery of India'. They are all under the Adults tab!" 
    },
    { 
        keywords: ["harry", "potter", "magic", "fantasy", "hogwarts", "rowling"], 
        response: "Expecto Patronum! ✨ Yes, we have added the Harry Potter series to our magical collection! You can find the first book in the Children's section, and others in the Teens section. Happy reading!" 
    },
    { 
        keywords: ["science", "cosmos", "carl sagan", "stephen hawking", "space"], 
        response: "Our science collection is expanding! 🚀 We proudly host Carl Sagan's 'Cosmos' (in the Adults section) and Stephen Hawking's 'A Brief History of Time' (in the Teens section). Pure intellectual joy!" 
    },
    { 
        keywords: ["rating", "stars", "best", "review"], 
        response: "I can assure you we only host highly-rated literature! Most of our books have a rating of 4.5 and above. For example, 'Cosmos' and 'Harry Potter' boast perfect 5.0 ratings!" 
    },
    { 
        keywords: ["buy", "price", "rupee", "149", "pay", "download", "free"], 
        response: "To support our library hosting costs, high-quality digital downloads are priced at a flat rate of ₹149 per book! Just click 'View Book' and use the green payment button at the bottom." 
    },
    { 
        keywords: ["thank", "thanks", "amazing", "great", "awesome"], 
        response: "Aww, you are very welcome! ❤️ Hearing that makes my day. Please let me know if there's absolutely anything else I can do to help you!" 
    }
];

const fallbacks = [
    "Hmm, I am not quite sure I caught that! But hey, you can ask me about our new Harry Potter books, our science collection, or how book pricing works! 😊",
    "I'm still learning! Would you like me to suggest some amazing 5-star rated books to read?",
    "Sorry, my library index couldn't find an exact match for that! Feel free to ask about children's, teens, or adults collections, or our 149 rupees download process!"
];
let fallbackCount = 0;

function sendMessage() {
    const messageText = chatInput.value.trim();
    if (messageText === "") return;

    // User message
    appendMessage(messageText, 'user');
    chatInput.value = '';

    // Bot Typing
    const typingId = showTypingIndicator();

    setTimeout(() => {
        removeTypingIndicator(typingId);
        const response = generateBotResponse(messageText.toLowerCase());
        appendMessage(response, 'bot');
    }, 1000 + Math.random() * 800);
}

function generateBotResponse(input) {
    for (let item of botResponses) {
        if (item.keywords.some(kw => input.includes(kw))) {
            fallbackCount = 0; 
            return item.response;
        }
    }
    
    // Progressive fallbacks
    const response = fallbacks[fallbackCount % fallbacks.length];
    fallbackCount++;
    return response;
}

function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;
    msgDiv.innerHTML = `<div class="msg-content">${text}</div>`;
    chatMessages.appendChild(msgDiv);
    scrollToBottom();
}

function showTypingIndicator() {
    const id = 'typing-' + Date.now();
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot';
    typingDiv.id = id;
    typingDiv.innerHTML = `
        <div class="typing-indicator">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
        </div>
    `;
    chatMessages.appendChild(typingDiv);
    scrollToBottom();
    return id;
}

function removeTypingIndicator(id) {
    const element = document.getElementById(id);
    if (element) {
        element.remove();
    }
}

function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendMessageBtn.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
