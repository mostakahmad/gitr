import dbConnect from '../../lib/dbConnect';
import Gift from '../../models/Gift';

export default async function handler(req, res) {
  const { method } = req;

  await dbConnect();

  switch (method) {
    case 'GET':
      try {
        const gifts = await Gift.find({});
        res.status(200).json({ success: true, data: gifts });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case 'POST':
      try {
        const gift = await Gift.create(req.body);
        res.status(201).json({ success: true, data: gift });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
