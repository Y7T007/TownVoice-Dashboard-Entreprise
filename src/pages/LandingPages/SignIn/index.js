/**
=========================================================
* Material Kit 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import MKBox from "components/MKBox";
import MKTypography from "components/MKTypography";
import MKInput from "components/MKInput";
import MKButton from "components/MKButton";
import DefaultNavbar from "examples/Navbars/DefaultNavbar";
import SimpleFooter from "examples/Footers/SimpleFooter";
import routes from "routes";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { auth } from "../../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import entities_scores from './entities_scores.json';
import Container from "@mui/material/Container";
import Modal from "@mui/material/Modal";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import Divider from "@mui/material/Divider";
import { Select } from '@mui/base/Select';
import { Option } from '@mui/base/Option';
import MenuItem from "@mui/material/MenuItem";


function SignInBasic() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const provider = new GoogleAuthProvider();
    const handleSetRememberMe = () => setRememberMe(!rememberMe);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [entityId, setEntityId] = useState("");
    const [entityType, setEntityType] = useState("");

    const handleSignIn = async (event) => {
        event.preventDefault();
        try {
            await auth.signInWithEmailAndPassword(email, password);
            navigate("/dashboard");
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    const handleGoogleSignIn = async () => {
        try {

            const result = await signInWithPopup(auth, provider).then((userCredential) => {
                // Get the JWT and store it in local storage
                userCredential.user.getIdToken().then((idToken) => {
                    localStorage.setItem('jwt', idToken);
                });

                // Check if the ENTITYID is already set in the user's profile
                if (!userCredential.user.ENTITYID) {
                    // Show the modal to ask for ENTITYID
                    setShowModal(true);
                    setShow(!show);
                }else{
                    navigate("/dashboard");

                }
            });
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };
    const handleEntityIdSubmit = async () => {
        try {
            const user = auth.currentUser;
            if (user) {
                // Update the user's profile with the entityId
                await updateProfile(user, {
                    displayName: entityId, // Replace 'displayName' with the actual field name for ENTITYID
                    photoURL: entityType, // Replace 'photoURL' with the actual field name for entityType
                });

                // Close the modal
                setShowModal(false);

                // Navigate to the dashboard
                navigate("/dashboard");
            }
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };
    const [show, setShow] = useState(false);
    const toggleModal = () => setShow(!show);

  return (
    <>
      <DefaultNavbar routes={routes} />
      <MKBox
        position="absolute"
        top={0}
        left={0}
        zIndex={1}
        width="100%"
        minHeight="100vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.dark.main, 0.6),
              rgba(gradients.dark.state, 0.6)
            )}, url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />
      <MKBox px={1} width="100%" height="100vh" mx="auto" position="relative" zIndex={2}>
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            <Card>
              <MKBox
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
                mx={2}
                mt={-3}
                p={2}
                mb={1}
                textAlign="center"
              >
                <MKTypography variant="h4" fontWeight="medium" color="white" mt={1}>
                  Sign in
                </MKTypography>
                <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
                    <Grid item xs={2}>
                        <MKTypography
                            component={MuiLink}
                            href="#"
                            variant="body1"
                            color="white"
                            onClick={handleGoogleSignIn}
                        >
                            <GoogleIcon color="inherit" />
                        </MKTypography>
                    </Grid>
                </Grid>
              </MKBox>
              <MKBox pt={4} pb={3} px={3}>
                <MKBox component="form" role="form">
                  <MKBox mb={2}>
                    <MKInput
                        type="email"
                        label="Email"
                        fullWidth
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                  </MKBox>
                  <MKBox mb={2}>
                    <MKInput
                        type="password"
                        label="Password"
                        fullWidth
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                  </MKBox>
                    {showModal && (
                        <MKBox component="section" py={6}>
                            <Container>
                                <Grid container item xs={12} lg={10} justifyContent="center" mx="auto">
                                    <MKButton variant="gradient" color="info" onClick={toggleModal}>
                                        Veuillez renseigner l'ID de votre entreprise
                                    </MKButton>
                                </Grid>
                                <Modal open={show} onClose={toggleModal} sx={{ display: "grid", placeItems: "center" }}>
                                    <Slide direction="down" in={show} timeout={500}>
                                        <MKBox
                                            position="relative"
                                            width="500px"
                                            display="flex"
                                            flexDirection="column"
                                            borderRadius="xl"
                                            bgColor="white"
                                            shadow="xl"
                                        >
                                            <MKBox display="flex" alginItems="center" justifyContent="space-between" p={2}>
                                                <MKTypography variant="h5">Your modal title</MKTypography>
                                                <CloseIcon fontSize="medium" sx={{ cursor: "pointer" }} onClick={toggleModal} />
                                            </MKBox>
                                            <Divider sx={{ my: 0 }} />
                                            <MKBox p={2}>

                                                <div>
                                                    <label>Enter your ENTITYID:</label>
                                                    <MKInput fullWidth type="text" value={entityId} onChange={(e) => setEntityId(e.target.value)} />
                                                    <label>Select your EntityType:</label><br/>
                                                    <select style={{padding:"15px", width:"100%",borderRadius:"7px"}} value={entityType} onChange={(e) => setEntityType(e.target.value)}>
                                                        {Object.keys(entities_scores).map((key) => (
                                                            <option  value={key}>{key}</option >
                                                        ))}
                                                    </select><br/><br/>
                                                    <MKButton variant="gradient" color="primary" onClick={handleEntityIdSubmit}>Sauvegarder</MKButton>
                                                </div>
                                            </MKBox>
                                            <Divider sx={{ my: 0 }} />

                                        </MKBox>
                                    </Slide>
                                </Modal>
                            </Container>
                        </MKBox>
                    )}
                  <MKBox display="flex" alignItems="center" ml={-1}>
                    <Switch checked={rememberMe} onChange={handleSetRememberMe} />
                    <MKTypography
                      variant="button"
                      fontWeight="regular"
                      color="text"
                      onClick={handleSetRememberMe}
                      sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                    >
                      &nbsp;&nbsp;Remember me
                    </MKTypography>
                  </MKBox>
                    <MKBox mt={4} mb={1}>
                        <MKButton variant="gradient" color="info" fullWidth type="submit">
                            sign in
                        </MKButton>
                    </MKBox>
                  <MKBox mt={3} mb={1} textAlign="center">
                    <MKTypography variant="button" color="text">
                      Don&apos;t have an account?{" "}
                      <MKTypography
                        component={Link}
                        to="/authentication/sign-up/cover"
                        variant="button"
                        color="info"
                        fontWeight="medium"
                        textGradient
                      >
                        Sign up
                      </MKTypography>
                    </MKTypography>
                  </MKBox>
                </MKBox>
              </MKBox>
            </Card>
          </Grid>
        </Grid>
      </MKBox>
      <MKBox width="100%" position="absolute" zIndex={2} bottom="1.625rem">
        <SimpleFooter light />
      </MKBox>
    </>
  );
}

export default SignInBasic;
