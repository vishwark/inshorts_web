import axios from "axios";

export async function fetchNewsByCategory(){
    const {lang, offset, category}= JSON.parse(localStorage.getItem('settings'))
    const response = await axios.get(`/api/news?category=${category.tag}&offset=${offset[category.tag]}&lang=${lang}`);
    return response.data;
}

export async function fetchNewsByTopic() {
    const {lang, customTopic, page}= JSON.parse(localStorage.getItem('settings'))
    const response = await axios.get(`/api/suggested_topics?topic=${customTopic.tag}&page=${page}&lang=${lang}`);
    return response.data;
}

export async function fetchNewsTopics() {
    const {lang}= JSON.parse(localStorage.getItem('settings'))
    const response = await axios.get(`/api/trending_topics?lang=${lang}`);
    return response.data;
}