import app from "..";

const port = process.env.PORT || 4100;

app.listen(port, () => console.log(`app listening on port ${port}`));
