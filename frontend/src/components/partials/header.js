import React from "react";
import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const Header = ({title}) => {
    return (
        <head>
            <meta charset="UTF-8"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <title>Recipe ~ {title}</title>
            <Link rel="stylesheet" to="/css/style.css"/>
        </head>
    )
}

export default Header;