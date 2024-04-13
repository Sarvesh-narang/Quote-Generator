const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('quote-author');
const TwitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');
let apiQuotes = [];


// show loading

function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

// hide loading

function complete() {
    quoteContainer.hidden = false;
    loader.hidden = true;
}
async function newQuote() {
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

    if (!quote.author) {
        authorText.textContent = "Unknown";
    } else {
        authorText.textContent = quote.author;
    }

    if (quote.text.length > 120) {
        quoteText.classList.add("long-quote");
    } else {
        quoteText.classList.remove('long-quote');
    }

    quoteText.textContent = quote.text;
    complete();
}

async function getQuotes() {
    loading();
    const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
    
    try {
        const response = await fetch(apiUrl); 
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        console.error("Error fetching quotes:", error);
    }
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, '_blank');
}

newQuoteBtn.addEventListener('click', newQuote);
TwitterBtn.addEventListener('click', tweetQuote);

getQuotes();

