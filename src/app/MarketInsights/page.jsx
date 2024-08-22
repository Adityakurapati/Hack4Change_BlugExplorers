'use client';

import React, { useState, useEffect } from 'react';
import styles from './marget.module.css';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend );

const statesWithDistricts={
        'Chhattisgarh': [ 'Durg', 'Bastar', 'Raipur', 'Bilaspur', 'Raigarh', 'Surguja' ],
        'Madhya Pradesh': [ 'Jabalpur', 'Balaghat', 'Chhindwara', 'Narsinghpur', 'Seoni / Shivani', 'Mandla', 'Sagar', 'Damoh', 'Tikamgarh', 'Chhatarpur', 'Panna', 'Rewa', 'Sidhi', 'Satna', 'Shahdol', 'Gwalior', 'Shivpuri', 'Guna', 'Datia', 'Morena', 'Bhind', 'Indore', 'Ratlam', 'Ujjain', 'Mandsaur', 'Dewas', 'Dhar', 'Jhabua', 'Khargone / West Nimar', 'Khandwa / East Nimar', 'Sehore', 'Raisen', 'Vidisha', 'Betul', 'Rajgarh', 'Shajapur', 'Hoshangabad' ],
        'Andhra Pradesh': [ 'Srikakulam', 'Visakhapatnam', 'East Godavari', 'West Godavari', 'Krishna', 'Guntur', 'S.P.S. Nellore', 'Kurnool', 'Ananthapur', 'Kadapa YSR', 'Chittoor' ],
        'Telangana': [ 'Hyderabad', 'Nizamabad', 'Medak', 'Mahabubnagar', 'Nalgonda', 'Warangal', 'Khammam', 'Karimnagar', 'Adilabad' ],
        'Karnataka': [ 'Bangalore', 'Kolar', 'Tumkur', 'Mysore', 'Mandya', 'Hassan', 'Shimoge', 'Chickmagalur', 'Chitradurga', 'Bellary', 'Dharwad', 'Belgaum', 'Bijapur / Vijayapura', 'Bidar', 'Raichur', 'Gulbarga / Kalaburagi', 'Dakshina Kannada', 'Uttara Kannada', 'Kodagu / Coorg' ],
        'Tamil Nadu': [ 'Chengalpattu MGR / Kanchipuram', 'South Arcot / Cuddalore', 'North Arcot / Vellore', 'Salem', 'Coimbatore', 'Tiruchirapalli / Trichy', 'Thanjavur', 'Madurai', 'Ramananthapuram', 'Thirunelveli', 'The Nilgiris', 'Kanyakumari' ],
        'Maharashtra': [ 'Bombay', 'Thane', 'Raigad', 'Ratnagiri', 'Nasik', 'Dhule', 'Jalgaon', 'Ahmednagar', 'Pune', 'Satara', 'Sangli', 'Solapur', 'Kolhapur', 'Aurangabad', 'Parbhani', 'Beed', 'Nanded', 'Osmanabad', 'Buldhana', 'Akola', 'Amarawati', 'Yeotmal', 'Wardha', 'Nagpur', 'Bhandara', 'Chandrapur' ],
        'Gujarat': [ 'Ahmedabad', 'Amreli', 'Banaskantha', 'Bharuch', 'Vadodara / Baroda', 'Bhavnagar', 'Valsad', 'Dangs', 'Jamnagar', 'Junagadh', 'Kheda', 'Kutch', 'Mehsana', 'Panchmahal', 'Rajkot', 'Sabarkantha', 'Surat', 'Surendranagar' ],
        'Rajasthan': [ 'Ajmer', 'Alwar', 'Banswara', 'Barmer', 'Bharatpur', 'Bhilwara', 'Bikaner', 'Bundi', 'Chittorgarh', 'Churu', 'Dungarpur', 'Ganganagar', 'Jaipur', 'Jaisalmer', 'Jalore', 'Jhalawar', 'Jhunjhunu', 'Jodhpur', 'Kota', 'Nagaur', 'Pali', 'Swami Madhopur', 'Sikar', 'Sirohi', 'Tonk', 'Udaipur' ],
        'Punjab': [ 'Gurdaspur', 'Amritsar', 'Kapurthala', 'Jalandhar', 'Hoshiarpur', 'Roopnagar / Ropar', 'Ludhiana', 'Ferozpur', 'Bhatinda', 'Sangrur', 'Patiala' ],
        'Haryana': [ 'Hissar', 'Gurgaon', 'Jind', 'Mahendragarh / Narnaul', 'Ambala', 'Karnal', 'Rohtak' ],
        'Uttar Pradesh': [ 'Saharanpur', 'Muzaffarnagar', 'Meerut', 'Buland Shahar', 'Aligarh', 'Mathura', 'Agra', 'Mainpuri', 'Etah', 'Bareilly', 'Budaun', 'Moradabad', 'Shahjahanpur', 'Pilibhit', 'Rampur', 'Bijnor', 'Farrukhabad', 'Etawah', 'Kanpur', 'Fatehpur', 'Allahabad', 'Jhansi', 'Jalaun', 'Hamirpur', 'Banda', 'Varanasi', 'Mirzpur', 'Jaunpur', 'Ghazipur', 'Ballia', 'Gorakhpur', 'Deoria', 'Basti', 'Azamgarh', 'Lucknow', 'Unnao', 'Rae-Bareily', 'Sitapur', 'Hardoi', 'Kheri', 'Faizabad', 'Gonda', 'Bahraich', 'Sultanpur', 'Pratapgarh', 'Barabanki' ],
        'Uttarakhand': [ 'Nainital', 'Almorah', 'Pithorgarh', 'Chamoli', 'Uttar Kashi', 'Tehri Garhwal', 'Garhwal', 'Dehradun' ],
        'Assam': [ 'Cachar', 'Darrang', 'Dibrugarh', 'Goalpara', 'Kamrup', 'Karbi Anglong', 'Lakhimpur', 'North Cachar Hil / Dima Hasao', 'Nagaon', 'Sibsagar' ],
        'Himachal Pradesh': [ 'Bilashpur', 'Chamba', 'Kangra', 'Kinnaur', 'Kullu', 'Lahul & Spiti', 'Solan', 'Mandi', 'Shimla', 'Sirmaur' ],
        'Kerala': [ 'Alappuzha', 'Kannur', 'Eranakulam', 'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad', 'Kollam', 'Thrissur', 'Thiruvananthapuram' ],
        'Orissa': [ 'Balasore', 'Bolangir', 'Cuttack', 'Dhenkanal', 'Ganjam', 'Kalahandi', 'Keonjhar', 'Koraput', 'Mayurbhanja', 'Phulbani (Kandhamal)', 'Puri', 'Sambalpur', 'Sundargarh' ],
        'West Bengal': [ '24 Parganas', 'Nadia', 'Murshidabad', 'Burdwan', 'Birbhum', 'Bankura', 'Hooghly', 'Howrah', 'Jalpaiguri', 'Darjeeling', 'Malda', 'Cooch Behar', 'Purulia', 'Midnapur', 'West Dinajpur' ],
        'Bihar': [ 'Champaran', 'Muzaffarpur', 'Darbhanga', 'Saharsa', 'Purnea', 'Saran', 'Patna', 'Mungair', 'Bhagalpur', 'Santhal Paragana / Dumka', 'Shahabad (now part of Bhojpur district)', 'Gaya', 'Hazaribagh', 'Dhanbad', 'Palamau', 'Ranchi', 'Singhbhum' ],
        'Jharkhand': [ 'Champaran', 'Muzaffarpur', 'Darbhanga', 'Saharsa', 'Purnea', 'Saran', 'Patna', 'Mungair', 'Bhagalpur', 'Santhal Paragana / Dumka', 'Shahabad (now part of Bhojpur district)', 'Gaya', 'Hazaribagh', 'Dhanbad', 'Palamau', 'Ranchi', 'Singhbhum' ]
};

const cropOptions=[
        "RICE AREA (1000 ha)",
        "RICE PRODUCTION (1000 tons)",
        "RICE YIELD (Kg per ha)",
        "WHEAT AREA (1000 ha)",
        "WHEAT PRODUCTION (1000 tons)",
        "WHEAT YIELD (Kg per ha)",
        "KHARIF SORGHUM AREA (1000 ha)",
        "KHARIF SORGHUM PRODUCTION (1000 tons)",
        "KHARIF SORGHUM YIELD (Kg per ha)",
        "RABI SORGHUM AREA (1000 ha)",
        "RABI SORGHUM PRODUCTION (1000 tons)",
        "RABI SORGHUM YIELD (Kg per ha)",
        "COTTON AREA (1000 ha)",
        "COTTON PRODUCTION (1000 tons)",
        "COTTON YIELD (Kg per ha)",
        "SUGAR CANE AREA (1000 ha)",
        "SUGAR CANE PRODUCTION (1000 tons)",
        "SUGAR CANE YIELD (Kg per ha)",
        "POTATO AREA (1000 ha)",
        "POTATO PRODUCTION (1000 tons)",
        "POTATO YIELD (Kg per ha)",
        "ONION AREA (1000 ha)",
        "ONION PRODUCTION (1000 tons)",
        "ONION YIELD (Kg per ha)",
        "GROUNDNUT AREA (1000 ha)",
        "GROUNDNUT PRODUCTION (1000 tons)",
        "GROUNDNUT YIELD (Kg per ha)"
];

const CropYieldChart=() =>
{
        const [ selectedState, setSelectedState ]=useState( 'Chhattisgarh' );
        const [ selectedDistrict, setSelectedDistrict ]=useState( '' );
        const [ selectedCrop, setSelectedCrop ]=useState( cropOptions[ 0 ] );
        const [ chartData, setChartData ]=useState( {
                datasets: [
                        {
                                label: 'Crop Data',
                                data: [],
                                borderColor: '#FF5733',
                                backgroundColor: 'rgba(255, 87, 51, 0.2)',
                        }
                ]
        } );

        const [ chartOptions, setChartOptions ]=useState( {
                responsive: true,
                plugins: {
                        legend: {
                                display: true,
                        },
                        title: {
                                display: true,
                                text: 'Crop Yield Data',
                        },
                },
                scales: {
                        x: {
                                type: 'linear',
                                position: 'bottom',
                                title: {
                                        display: true,
                                        text: 'Year',
                                },
                        },
                        y: {
                                title: {
                                        display: true,
                                        text: 'Value',
                                },
                        },
                },
        } );

        useEffect( () =>
        {
                fetchData();
        }, [ selectedState, selectedDistrict, selectedCrop ] );

        const handleStateChange=( event ) =>
        {
                setSelectedState( event.target.value );
                setSelectedDistrict( '' ); // Reset district when state changes
        };

        const handleDistrictChange=( event ) =>
        {
                setSelectedDistrict( event.target.value );
        };

        const handleCropChange=( event ) =>
        {
                setSelectedCrop( event.target.value );
        };

        const fetchData=async () =>
        {
                try
                {
                        const baseURL='http://localhost:5000/market_insights';
                        const queryParams=new URLSearchParams( {
                                state: selectedState,
                                city: selectedDistrict,
                                crop_type: selectedCrop
                        } ).toString();

                        const url=`${ baseURL }?${ queryParams }`;

                        const response=await fetch( url, {
                                method: 'GET',
                                headers: { 'Content-Type': 'application/json' }
                        } );
                        const result=await response.json();

                        const transformedData=result.map( item => ( {
                                x: item.year,
                                y: item.value
                        } ) );

                        setChartData( {
                                datasets: [
                                        {
                                                label: selectedCrop,
                                                data: transformedData,
                                                borderColor: '#FF5733',
                                                backgroundColor: 'rgba(255, 87, 51, 0.2)',
                                        }
                                ]
                        } );

                        setChartOptions( prevOptions => ( {
                                ...prevOptions,
                                plugins: {
                                        ...prevOptions.plugins,
                                        title: {
                                                ...prevOptions.plugins.title,
                                                text: `Crop Yield Data for ${ selectedCrop } in ${ selectedDistrict }`
                                        }
                                }
                        } ) );
                } catch ( error )
                {
                        console.error( 'Error fetching crop yield data:', error );
                }
        };

        return (
                <div className={ styles.container }>
                        <div className={ styles.filters }>
                                <label htmlFor="state-select">State:</label>
                                <select id="state-select" value={ selectedState } onChange={ handleStateChange } className={ styles.dropdown }>
                                        { Object.keys( statesWithDistricts ).map( state => (
                                                <option key={ state } value={ state }>
                                                        { state }
                                                </option>
                                        ) ) }
                                </select>

                                <label htmlFor="district-select">District:</label>
                                <select id="district-select" value={ selectedDistrict } onChange={ handleDistrictChange } className={ styles.dropdown }>
                                        <option value="">Select District</option>
                                        { statesWithDistricts[ selectedState ]?.map( district => (
                                                <option key={ district } value={ district }>
                                                        { district }
                                                </option>
                                        ) ) }
                                </select>

                                <label htmlFor="crop-select">Crop Type:</label>
                                <select id="crop-select" value={ selectedCrop } onChange={ handleCropChange } className={ styles.dropdown }>
                                        { cropOptions.map( crop => (
                                                <option key={ crop } value={ crop }>
                                                        { crop }
                                                </option>
                                        ) ) }
                                </select>
                        </div>
                        <div className={ styles.chart }>
                                <Line data={ chartData } options={ chartOptions } />
                        </div>
                </div>
        );
};

export default CropYieldChart;
