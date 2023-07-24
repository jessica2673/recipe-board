import React from "react";
import { Link } from "react-router-dom";

const About = () => {
    return (
        <div>
            {/* <%- include('../partials/header.ejs') %> */}
            <body>
                {/* <%- include("../partials/nav.ejs") %> */}
                <div class="about-page">
                    <h1>About!</h1>
                    <div>
                        <p>Welcome to Let It Cook! A quick solution to storing all your favourite
                            recipes. This easily accessible website allows you to share all your 
                            cooking creations with others, and find unique recipes just for you!
                        </p>
                    </div>
                </div>
                {/* <%- include('../partials/footer.ejs') %> */}
            </body>
        </div>
    )
}

export default About;