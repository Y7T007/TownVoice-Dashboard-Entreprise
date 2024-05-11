/*
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";

// Material Kit 2 React components
import MKBox from "components/MKBox";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import MKTypography from "components/MKTypography";

// Material Kit 2 React examples
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import DefaultFooter from "examples/Footers/DefaultFooter";

// Routes
import routes from "routes";
import footerRoutes from "footer.routes";

// Image
import bgImage from "assets/images/illustrations/illustration-reset.jpg";
import {QRCodeGenerator} from "../../QRCodeGenerator";
import React, {useEffect, useState} from "react";
import axios from 'axios';
import Rating from "@mui/material/Rating";
import Card from "@mui/material/Card";
import {CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import { onAuthStateChanged } from "firebase/auth";
import {auth} from "../../../firebase";


function EntityRatingsAndComments() {
    const [entityId, setEntityId] = useState('');
    const [ratings, setRatings] = useState([]);
    const [comments, setComments] = useState([]);

    const fetchRatingsAndComments = async () => {
        try {
            const ratingsResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/ratings/get-ratings-by-entity/${entityId}`);
            const commentsResponse = await axios.get(`${process.env.REACT_APP_SERVER_URL}/comments/get-comments-by-entity/${entityId}`);
            setRatings(ratingsResponse.data);
            setComments(commentsResponse.data);
        } catch (error) {
            console.error(error);
        }
    };

    // Calculate average scores
    const averageScores = ratings.reduce((acc, rating) => {
        Object.entries(rating.scores).forEach(([key, value]) => {
            if (!acc[key]) {
                acc[key] = { sum: 0, count: 0 };
            }
            acc[key].sum += value;
            acc[key].count += 1;
        });
        return acc;
    }, {});

    Object.keys(averageScores).forEach(key => {
        averageScores[key] = averageScores[key].sum / averageScores[key].count;
    });

    return (
        <div>
            <MKInput type="text" value={entityId} onChange={e => setEntityId(e.target.value)} placeholder="Enter Entity ID"  className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            <MKButton color="secondary" className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" onClick={fetchRatingsAndComments}>
                Fetch
            </MKButton>
            <div>
                <h2>Average Ratings</h2>
                {Object.entries(averageScores).map(([key, value], i) => (
                    <div key={i}>
                        <p>{key}: {value.toFixed(2)}</p>
                        <Rating name="disabled" value={value} disabled />
                    </div>
                ))}
            </div>
            <div>
                <h2>Comments</h2>
                {comments.map((comment, index) => (
                    <Card key={index} sx={{ minWidth: 275, marginBottom: 2 }}>
                        <CardContent>
                            <Typography color="text.secondary" gutterBottom>
                                User ID: {comment.user_id}
                            </Typography>
                            <Typography variant="body2">
                                {comment.content}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
function ContactUs() {

    const [showQRCodeGenerator, setShowQRCodeGenerator] = useState(true);

    const toggleComponent = () => {
        setShowQRCodeGenerator(!showQRCodeGenerator);
    };

    const [entityId, setEntityId] = useState("");
    const [entityType, setEntityType] = useState(""); // Add a state variable for entity type

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                // Replace 'displayName' and 'entityType' with the actual field names
                const entityId = user.displayName;
                const entityType = user.photoURL;
                setEntityId(entityId);
                setEntityType(entityType); // Set entity type
            } else {
                // User is signed out
                setEntityId("");
                setEntityType(""); // Reset entity type
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);


    const jwt = localStorage.getItem('jwt');
    console.log(jwt);
    fetch('https://town-voice-server-b876d978cbe7.herokuapp.com/comments/get-comments-by-entity/ENTITY001', {
        headers: {
            Authorization: `Bearer ${jwt}`,
        },
    })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch((error) => {
            console.error('Error:', error);
        });
  return (
    <>
      <MKBox position="fixed" top="0.5rem" width="100%">
        <DefaultNavbar
          routes={routes}

        />
      </MKBox>
      <Grid container spacing={3} alignItems="center">
        <Grid item xs={12} lg={6}>
          <MKBox
            display={{ xs: "none", lg: "flex" }}
            width="calc(100% - 2rem)"
            height="calc(100vh - 2rem)"
            borderRadius="lg"
            ml={2}
            mt={2}
            sx={{ backgroundImage: `url(${bgImage})` }}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={10}
          md={7}
          lg={6}
          xl={4}
          ml={{ xs: "auto", lg: 6 }}
          mr={{ xs: "auto", lg: 6 }}
        >
          <MKBox
            bgColor="white"
            borderRadius="xl"
            shadow="lg"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            mt={{ xs: 20, sm: 18, md: 20 }}
            mb={{ xs: 20, sm: 18, md: 20 }}
            mx={3}
          >
            <MKBox
              variant="gradient"
              bgColor="info"
              coloredShadow="info"
              borderRadius="lg"
              p={2}
              mx={2}
              mt={-3}
            >
              <MKTypography variant="h3" color="white">
                Espace Admin            <strong>  {entityId && <p> {entityId}</p>} </strong>

              </MKTypography>
            </MKBox>
              <MKBox p={3}>
                  {showQRCodeGenerator ? <QRCodeGenerator EntityID={entityId} EntityType={entityType} /> : <EntityRatingsAndComments />}
                  <br/><br/><br/>
                  <MKButton color="primary" onClick={toggleComponent}  className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" >
                      {showQRCodeGenerator ? 'Show Ratings and Comments' : 'Show QR Code Generator'}
                  </MKButton>
              </MKBox>
          </MKBox>
        </Grid>
      </Grid>
      <MKBox pt={6} px={1} mt={6}>
        <DefaultFooter content={footerRoutes} />
      </MKBox>
    </>
  );
}

export default ContactUs;
