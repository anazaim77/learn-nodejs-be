var recipes = require("../recipes.json");
var router = require("express").Router();

router.get("/step/:id", (req, res) => {
  let { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).send("NOT_FOUND");
  }
  const recipe = recipes.find((recipe) => recipe.id === id);
  if (!recipe) {
    return res.status(400).send("NOT_FOUND");
  }
  let { elapsedTime = "" } = req.query;

  //   if (elapsedTime == 0) {
  //     return res.json({ index: 0 });
  //   }
  return res.json({ index: 0 });

  const stepIndex = recipe.timers.findIndex((timer, index) =>
    timer > elapsedTime ? index : elapsedTime
  );
  console.log("stepIndex", stepIndex);
  return res.status(200).json({ index: stepIndex });
});

module.exports = router;
