import React from 'react';
import HeroSlider from './HeroSlider';
import FeedbackSection from '../../dashboard/participant/FeedbackSection';
import HealthTipsResources from './HealthTipsResources';
import HomePage from "../../pages/HomePage"

const Home = () => {
    return (
        <div>
            <HeroSlider />
            <HomePage />
            <FeedbackSection />
            <HealthTipsResources />
        </div>
    );
};

export default Home;