
// Last.fm API settings
const API_KEY = "c7c97c1be0789c1307a407896c1fe6c9";
const API_URL = "https://ws.audioscrobbler.com/2.0/";

// HTML elements
const searchForm = document.getElementById("searchForm");
const artistSearch = document.getElementById("artistSearch");
const artistList = document.getElementById("artistList");
const artistName = document.getElementById("artistName");
const artistInfo = document.getElementById("artistInfo");
const albumList = document.getElementById("albumList");
const albumDetails = document.getElementById("albumDetails");
const albumTitle = document.getElementById("albumTitle");
const albumContent = document.getElementById("albumContent");
const message = document.getElementById("message");

// Function for making API requests
async function getData(method, parameters = {}) {
    const url = new URL(API_URL);

    url.searchParams.set("method", method);
    url.searchParams.set("api_key", API_KEY);
    url.searchParams.set("format", "json");

    Object.entries(parameters).forEach(([key, value]) => {
        url.searchParams.set(key, value);
    });

    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
        throw new Error(data.message || "API request failed");
    }

    return data;
}

// Get artist information and albums
async function loadArtist(name) {
    if (!name.trim()) {
        message.textContent = "Please enter an artist name.";
        return;
    }

    message.textContent = "Loading artist...";
    albumList.innerHTML = "";
    albumDetails.hidden = true;
    artistInfo.textContent = "";

    try {
        const data = await getData("artist.getInfo", {
            artist: name,
            autocorrect: 1
        });

        const artist = data.artist;

        artistName.textContent = artist.name;

        artistInfo.textContent =
            artist.stats.listeners + " listeners on Last.fm";

        const albumData = await getData("artist.getTopAlbums", {
            artist: artist.name,
            limit: 12
        });

        const albums = albumData.topalbums.album;

        albumList.innerHTML = "";

        if (!albums || albums.length === 0) {
            message.textContent = "No albums found.";
            return;
        }

        albums.forEach(album => {
            const card = document.createElement("div");
            card.className = "album-card";

            const image = document.createElement("img");

            const images = album.image || [];
            const cover = images.find(item =>
                item.size === "extralarge"
            ) || images[images.length - 1];

            image.src = cover && cover["#text"]
                ? cover["#text"]
                : "https://placehold.co/300x300?text=No+Image";

            image.alt = album.name + " album cover";

            const title = document.createElement("h3");
            title.textContent = album.name;

            const listeners = document.createElement("p");
            listeners.textContent =
                Number(album.playcount || 0).toLocaleString()
                + " plays";

            card.append(image, title, listeners);

            card.addEventListener("click", () => {
                loadAlbum(artist.name, album.name);
            });

            albumList.appendChild(card);
        });

        message.textContent = "Albums loaded successfully!";
        document.getElementById("artistSection").hidden = false;

    } catch (error) {
        message.textContent = "Error: " + error.message;
    }
}

// Load album details and songs
async function loadAlbum(artist, album) {
    albumTitle.textContent = "Loading album...";
    albumDetails.hidden = false;
    albumContent.innerHTML = "";

    try {
        const data = await getData("album.getInfo", {
            artist: artist,
            album: album
        });

        const info = data.album;

        albumTitle.textContent = info.name;

        const image = document.createElement("img");
        const images = info.image || [];
        const cover = images.find(item =>
            item.size === "extralarge"
        ) || images[images.length - 1];

        image.src = cover && cover["#text"]
            ? cover["#text"]
            : "https://placehold.co/300x300?text=No+Image";

        image.alt = info.name + " album cover";

        const details = document.createElement("p");
        details.textContent =
            "Artist: " + info.artist +
            " | Listeners: " +
            Number(info.listeners || 0).toLocaleString();

        const heading = document.createElement("h3");
        heading.textContent = "Tracklist";

        const songList = document.createElement("ol");

        let tracks = info.tracks?.track || [];

        // Make sure tracks are always an array
        if (!Array.isArray(tracks)) {
            tracks = [tracks];
        }

        if (tracks.length === 0) {
            const item = document.createElement("li");
            item.textContent = "No track information available.";
            songList.appendChild(item);
        } else {
            tracks.forEach(track => {
                const item = document.createElement("li");
                item.textContent = track.name;
                songList.appendChild(item);
            });
        }

        albumContent.append(image, details, heading, songList);

        albumDetails.scrollIntoView({
            behavior: "smooth"
        });

    } catch (error) {
        albumTitle.textContent = "Album information";
        albumContent.textContent = error.message;
    }
}

// Search for an artist using custom search text
searchForm.addEventListener("submit", async function(event) {
    event.preventDefault();

    const searchText = artistSearch.value.trim();

    if (!searchText) {
        message.textContent = "Please enter an artist name.";
        return;
    }

    message.textContent = "Searching...";

    try {
        const data = await getData("artist.search", {
            artist: searchText,
            limit: 5
        });

        const artists = data.results.artistmatches.artist;

        artistList.innerHTML = "";

        const results = Array.isArray(artists)
            ? artists
            : [artists];

        if (!artists || results.length === 0) {
            message.textContent = "No artists found.";
            return;
        }

        results.forEach(artist => {
            const button = document.createElement("button");
            button.textContent = artist.name;

            button.addEventListener("click", () => {
                loadArtist(artist.name);
            });

            artistList.appendChild(button);
        });

        message.textContent = "Select an artist from the results.";

    } catch (error) {
        message.textContent = "Error: " + error.message;
    }
});

// Popular artist buttons
artistList.addEventListener("click", function(event) {
    if (event.target.dataset.artist) {
        loadArtist(event.target.dataset.artist);
    }
});
