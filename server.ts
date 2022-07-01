import app from './src/app';

app.listen(process.env.PORT || 3001, () => {
  console.log('Server is running at port 3001.');
});
