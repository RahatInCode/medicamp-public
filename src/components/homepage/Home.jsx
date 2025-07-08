import React from 'react';
import HeroSlider from './HeroSlider';
import FeedbackSection from '../../Feedback/FeedbackSection';
import HealthTipsResources from './HealthTipsResources';

const Home = () => {
    return (
        <div>
            <HeroSlider />
            <FeedbackSection />
            <HealthTipsResources />
        </div>
    );
};

export default Home;