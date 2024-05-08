import {useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import qs from "qs";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import {Backdrop, Button, CircularProgress, Typography} from "@mui/material";
import {MainLayout} from "../layouts/MainLayout";
import "./RatingPage.css";
import HoverRating from "../components/HoverRating";
import {Modal, Snackbar} from "@mui/base";
import Box from "@mui/material/Box";

export function RatingPage() {
    const location = useLocation();
    const [data, setData] = useState(null);
    const [ratings, setRatings] = useState({});
    const [comment, setComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('green');

    useEffect(() => {
        const parsed = qs.parse(location.search, { ignoreQueryPrefix: true });
        setData(JSON.parse(parsed.data));
    }, [location]);

    if (!data) {
        return <div>Loading...</div>;
    }

    const handleStarClick = (starCount, element) => {
        setRatings({...ratings, [element]: starCount});
    };
    const handleRatingChange = (element, rating) => {
        setRatings(prevRatings => ({ ...prevRatings, [element]: rating }));
    };

    const handleSaveRatingsClick = async () => {
        setLoading(true);
        try {



    const scores = Object.fromEntries(
        Object.entries(ratings).map(([element, rating]) => [element, parseFloat(rating)])
    );

    const payload = {
        transactionID: data.transaction_id,
        scores
    };

    console.log(payload);

            const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/ratings/add-rating/${data.entity_id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Failed to save ratings');
            }

            setMessage('Ratings saved successfully');
            setMessageColor('green');
        } catch (error) {
            console.error(error);
            setMessage('Failed to save ratings');
            setMessageColor('red');
        } finally {
            setLoading(false);
        }
};

    const handleCommentSubmit = async () => {
        setLoading(true);
        try {
        // Create the payload
        const payload = {
            transactionID: data.transaction_id,
            comment
        };

            const response = await fetch(`http://localhost:8082/comments/add-comment/${data.entity_id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Failed to submit comment');
            }

            setMessage('Comment submitted successfully');
            setMessageColor('green');
        } catch (error) {
            console.error(error);
            setMessage('Failed to submit comment');
            setMessageColor('red');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setModalOpen(false);
    };

    return (
        <MainLayout Entity={data.entity_id}>

        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold my-10 self-center" align="center">SUMMARY</h1>

            <div className="summary px-8">

                <div className="info-pair">
                    <strong>Entity ID:</strong>
                    <span>{data.entity_id}</span>
                </div>
                <div className="info-pair">
                    <strong>Transaction ID:</strong>
                    <span>{data.transaction_id}</span>
                </div>
                <div className="info-pair">
                    <strong>Entity Type:</strong>
                    <span>{data.entity_type}</span>
                </div>
                <div className="info-pair">
                    <strong>Date Time:</strong>
                    <span>{new Date(data.DateTime).toLocaleString()}</span>
                </div>

            </div>


            {/*divider*/}
            <hr className="my-6"/>
            <p className="text-xl mb-2"><strong>Products/Services Delivered:</strong></p>
            <List sx={{ width: '100%' }}>
                {Array.isArray(data.elements) ? data.elements.map((element, index) => (
                    <ListItem key={index} className="flex-grow container mx-auto px-5 bg-base-100/75 rounded-2xl my-4">
                        <ListItemText
                            primary={`${index + 1}.  ${element}`}
                        />
                    </ListItem>
                )) : null}
            </List>
            <div className="text-right">
     <span className="inline-block bg-green-200  text-green-800 px-5 text-lg font-semibold rounded-2xl py-4">
         TOTAL : {data.amount}
     </span>
            </div>
            <hr className="my-6"/>

            <h2 className="text-2xl font-bold mt-4 mb-2">Rating Elements</h2>
            {Array.isArray(data.Rating_elements) ? data.Rating_elements.map((element, index) => (
                <div key={index} className="RatingBox flex-col container mx-auto px-5 py-5 bg-base-100/75 rounded-2xl my-4">
                    <h2 className="text-xl font-semibold mb-3 uppercase">{element}</h2>
                    <div className="flex items-center py5" style={{width:"100%"}}>
                        <HoverRating element={element} onRatingChange={handleRatingChange}  />
                    </div>
                </div>
            )) : null}

            <button
                className="mt-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-xl self-center"
                onClick={handleSaveRatingsClick}
            >
                Save Ratings
            </button>
            <div className="container mx-auto px-4 my-14">
                <h2 className="text-2xl font-bold mb-2">Add Comment</h2>
                <div className="bg-base-100/75 rounded-2xl p-4">
                <textarea
                    className="w-full px-3 py-2 text-white border rounded-lg focus:outline-none"
                    rows="4"
                    placeholder="Write your comment here..."
                    value={comment}
                    onChange={e => setComment(e.target.value)}
                ></textarea>
                    <button
                        className="mt-2 px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-xl"
                        onClick={handleCommentSubmit}
                    >
                        Submit
                    </button>
                </div>
            </div>

        </div>
            <Backdrop open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
                message="Note archived"
                action={action}
            />
            <Typography variant="h6" style={{ color: messageColor }}>
                {message}
            </Typography>
        </MainLayout>

    );
}


const Star = ({ filled, onClick }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 cursor-pointer ${filled ? 'text-yellow-400' : 'text-gray-300'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={onClick}
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 14l-4.091 2.316a1 1 0 01-1.498-1.054l.84-4.915-3.572-3.478a1 1 0 01.554-1.705l4.946-.719 2.214-4.48a1 1 0 011.796 0l2.214 4.48 4.946.719a1 1 0 01.554 1.705l-3.572 3.478.84 4.915a1 1 0 01-1.498 1.054L12 14z"
            />
        </svg>
    );
};