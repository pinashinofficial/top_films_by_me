// =====================================================================
// ОБЩИЕ ФУНКЦИИ ПОИСКА ПОСТЕРОВ ЧЕРЕЗ TMDB
// Используются и в admin.html (поиск при добавлении/редактировании),
// и в database.html (массовый поиск для уже добавленных фильмов),
// чтобы логика поиска не расходилась между страницами.
// =====================================================================

async function tmdbSearchMulti(title, language) {
    const url = `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_API_KEY}&language=${language}&include_adult=false&query=${encodeURIComponent(title)}`;
    const res = await fetch(url);
    const data = await res.json();
    if (!res.ok || data.success === false) {
        throw new Error(data.status_message || ('TMDB request failed: ' + res.status));
    }
    return (data.results || []).filter(r => (r.media_type === 'movie' || r.media_type === 'tv') && r.poster_path);
}

function rankTmdbResults(results, preferredType, year) {
    return [...results].sort((a, b) => {
        // Сначала совпадение по нужному типу (фильм/сериал)
        const aTypeMatch = a.media_type === preferredType ? 1 : 0;
        const bTypeMatch = b.media_type === preferredType ? 1 : 0;
        if (aTypeMatch !== bTypeMatch) return bTypeMatch - aTypeMatch;

        // Затем совпадение по году, если он указан
        if (year) {
            const aYear = (a.release_date || a.first_air_date || '').slice(0, 4);
            const bYear = (b.release_date || b.first_air_date || '').slice(0, 4);
            const aYearMatch = aYear === String(year) ? 1 : 0;
            const bYearMatch = bYear === String(year) ? 1 : 0;
            if (aYearMatch !== bYearMatch) return bYearMatch - aYearMatch;
        }

        // Затем по популярности
        return (b.popularity || 0) - (a.popularity || 0);
    });
}

function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str == null ? '' : String(str);
    return div.innerHTML;
}
