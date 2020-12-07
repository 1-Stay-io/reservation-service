/* eslint-disable no-console */
const express = require('express');
const path = require('path');
const morgan = require('morgan');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use('/listings/:id', express.static(path.join(__dirname, '..', 'client', 'dist')));

app.get();