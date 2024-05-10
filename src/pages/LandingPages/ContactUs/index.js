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
import {useState} from "react";
import axios from 'axios';
import Rating from "@mui/material/Rating";


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

    return (
        <div>
            <input type="text" value={entityId} onChange={e => setEntityId(e.target.value)} placeholder="Enter Entity ID" />
            <button onClick={fetchRatingsAndComments}>Fetch</button>
            <div>
                <h2>Ratings</h2>
                {ratings.map((rating, index) => (
                    <div key={index}>
                        <h3>Transaction ID: {rating.user_id}</h3>
                        {Object.entries(rating.scores).map(([key, value], i) => (
                            <>
                            <p key={i}>{key}: {value}</p>
                            <Rating name="disabled" value={value} disabled />
                            </>
                        ))}
                    </div>
                ))}
            </div>
            <div>
                <h2>Comments</h2>
                {comments.map((comment, index) => (
                    <div key={index}>
                        <h3>User ID: {comment.user_id}</h3>
                        <p>{comment.content}</p>
                    </div>
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
          action={{
            type: "external",
            route: "https://www.creative-tim.com/product/material-kit-react",
            label: "free download",
            color: "info",
          }}
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
                Contact us
              </MKTypography>
            </MKBox>
              <MKBox p={3}>
                  {showQRCodeGenerator ? <QRCodeGenerator /> : <EntityRatingsAndComments />}
                  <button onClick={toggleComponent}>
                      {showQRCodeGenerator ? 'Show Ratings and Comments' : 'Show QR Code Generator'}
                  </button>
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
