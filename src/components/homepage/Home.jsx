import React from 'react';
import HeroSlider from './HeroSlider';
import FeedbackSection from '../../dashboard/participant/FeedbackSection';
import HealthTipsResources from './HealthTipsResources';
import HomePage from "../../pages/HomePage"
import HomeSections from './HomeSections';
import { Toaster } from 'react-hot-toast';

const Home = () => {
    return (
        <div>
            <HeroSlider />
            <HomePage />
            <FeedbackSection />
            <HealthTipsResources />
            <HomeSections />
            <Toaster position="top-right" />
        </div>
    );
};

export default Home;