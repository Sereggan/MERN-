const express = require("express");

const router = express.Router();
const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire",
    description: "Building",
    location: {
      lat: 32,
      lon: 123,
    },
    address: " 20 W 34th",
    creator: "u1",
  },
];
router.get("/:pid", (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });
  if (!place) {
    return res.status(404).json({ message: "Could not find a place" });
  }

  res.json({ place });
});

router.get("/user/:uid", (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.find((p) => {
    return p.creator === userId;
  });
  if (!places) {
    return res.status(404).json({ message: "Could not find any place" });
  }
  res.json({ places });
});

module.exports = router;
