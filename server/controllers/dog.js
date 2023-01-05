const Dog = require("../models/dog");

exports.getDogs = async (req, res) => {
  try {
    const result = await Dog.find().select("name age _id");
    if (result && result.length !== 0) {
      return res.status(200).json({
        count: result.length,
        dogs: result.map((dog) => {
          return {
            ...dog.toObject(),
            request: {
              type: "GET",
              url: `http://localhost:3000/dog/${dog._id}`,
            },
          };
        }),
      });
    }
    res.status(404).json({ msg: "Dogs not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};

exports.getDog = async (req, res) => {
  try {
    const result = await Dog.findById(req.params.id).select("-__v");
    if (result) {
      return res.status(200).json({
        ...result.toObject(),
        request: {
          type: "GET",
          url: "http://127.0.0.1:3000/dog",
        },
      });
    }
    res.status(404).json({ msg: "Dog not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};

exports.postDog = async (req, res) => {
  try {
    const dog = new Dog({
      name: req.body.name,
      age: req.body.age,
      color:req.body.color,
      tail:req.body.tail,
    });
    const result = await dog.save();
    if (result) {
      return res.status(201).json({
        message: "Your dog was created",
        createdDog: {
          ...result.toObject(),
          payload: {
            type: "GET",
            url: `http://127.0.0.1:3000/dog/${result._id}`,
          },
        },
      });
    }
    res.status(500).json({ msg: "Dog was not created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error,
    });
  }
};

exports.putDog = async (req, res) => {
  try {
    const update = {
      name: req.body.name,
      age: req.body.age,
      color:req.body.color,
      tail:req.body.tail,
    };
    const result = await Dog.findByIdAndUpdate(req.params.id, update);
    if (result) {
      return res.status(200).json({
        msg: `Dog ${req.params.id} was updated`,
        request: {
          type: "GET",
          url: `http://127.0.0.1:3000/dog/${req.params.id}`,
        },
      });
    }
    res.status(500).json({ msg: "Dog could not be updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};

exports.patchDog = async (req, res) => {
  try {
    const update = {};
    for (const ops of req.body) {
      update[ops.propName] = ops.value;
    }
    const result = await Dog.findByIdAndUpdate(req.params.id, update);
    if (result) {
      return res.status(200).json({
        msg: `Dog ${req.params.id} was updated`,
        request: {
          type: "GET",
          url: `http://127.0.0.1:3000/dog/${req.params.id}`,
        },
      });
    }
    res.status(500).json({ msg: "Dog could not be updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};

exports.deleteDog = async (req, res) => {
  try {
    const result = await Dog.findByIdAndDelete(req.params.id);
    if (result) {
      return res.status(200).json({
        msg: `Dog ${result.name}, id: ${result._id} was deleted`,
      });
    }
    res.status(404).json({
      msg: "Dog not found",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error,
    });
  }
};
