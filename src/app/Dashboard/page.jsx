'use client';  // Add this if you're using Next.js 13 with App Router

import React, { useState } from 'react';
import styles from './dashboard.module.css';
import CropProductionRecommender from './CropProductionRecommender';
import RemoteFarm from './RemoteFarm';
import FertilizerRecommendation from './FertilizerRecommendation';
import WaterRequirement from './WaterRequirement';


const Dashboard=() =>
{
        const components={
                CropProductionRecommender: <CropProductionRecommender />,
                RemoteFarm: <RemoteFarm />,
                FertilizerRecommendation: <FertilizerRecommendation />,
                WaterRequirement: <WaterRequirement />
        };

        const [ activeComponent, setActiveComponent ]=useState( 'CropProductionRecommender' );

        return (
                <div className={ styles.dashboardContainer }>
                        <div className={ styles.sidebar }>
                                <div className={ styles.userProfile }>
                                        <div className={ styles.userAvatar }></div>
                                        <div className={ styles.userName }>Shivanand</div>
                                </div>
                                <div className={ styles.menus }>
                                        { Object.keys( components ).map( ( component ) => (
                                                <div
                                                        key={ component }
                                                        className={ styles.menuItem }
                                                        onClick={ () => setActiveComponent( component ) }
                                                >
                                                        { component.replace( /([A-Z])/g, ' $1' ).trim() }
                                                </div>
                                        ) ) }
                                </div>
                        </div>
                        <div className={ styles.contentArea }>{ components[ activeComponent ]||'Select an option' }</div>
                </div>
        );
};

export default Dashboard;
