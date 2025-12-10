"use server";

export async function searchTracks(query: string) {
    if (!query) return { data: [] };

    try {
        const res = await fetch(`https://api.deezer.com/search?q=${encodeURIComponent(query)}`);
        if (!res.ok) throw new Error("Search failed");
        return await res.json();
    } catch (error) {
        console.error("Deezer search error:", error);
        return { data: [], error: "Failed to fetch results" };
    }
}
