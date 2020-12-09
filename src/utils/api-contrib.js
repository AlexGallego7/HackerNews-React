import axios from 'axios';

const BASE_API_URL = 'https://asw-hackernews-kaai12.herokuapp.com/api';

const getContribution = async (id) => {
    try {
        const story = await axios.get(`${BASE_API_URL}/${id}`);
        return story;
    } catch (error) {
        throw new Error('Error while loading data. Try again later.');
    }
};

export const getStories = async (type) => {
    try {
        const { data: storyIds } = await axios.get(
            `${BASE_API_URL}/${type}stories.json`
        );
        const stories = await Promise.all(storyIds.slice(0, 25).map(getStory));
        return stories;
    } catch (error) {
        throw new Error('Error while loading data. Try again later.');
    }
};
