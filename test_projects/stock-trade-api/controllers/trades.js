const Trades = require("../models/trades");

const createTrade = async (req, res) => {
  try {
    const { body } = req;
    const currentDataLength = (await Trades.findAll()).length;
    const tempTrade = {
      id: currentDataLength + 1,
      type: body.type,
      user_id: body.user_id,
      symbol: body.symbol,
      shares: body.shares,
      price: body.price,
      timestamp: body.timestamp,
    };
    const newTradeAdded = await Trades.create(tempTrade)
      .then((res) => res.get())
      .catch((error) => {
        console.log("error add trade", error);
        return null;
      });
    return res.status(201).json(newTradeAdded);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

const getAllTrades = async (req, res) => {
  try {
    const { type, user_id } = req.query;
    const queryFilter = { type, user_id };
    if (!type) delete queryFilter.type;
    if (!user_id) delete queryFilter.user_id;

    const allTrades = await Trades.findAll({ where: queryFilter }).catch(
      (error) => {
        console.log("error get trades", error);
        return null;
      }
    );
    return res.status(200).json(allTrades);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

const getAllTradeById = async (req, res) => {
  try {
    const id = req.params.id;
    const tradeById = await Trades.findOne({ where: { id } }).catch((error) => {
      console.log("error get trade by ID", error);
      return null;
    });
    if (!tradeById) {
      return res.status(404).send("ID not found");
    }
    return res.status(200).json(tradeById);
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
};

const defaultNotAllowedMethod = (_, res) => {
  res.status(405).send();
};

module.exports = {
  createTrade,
  getAllTrades,
  getAllTradeById,
  defaultNotAllowedMethod,
};
