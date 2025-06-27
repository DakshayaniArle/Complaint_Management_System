const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const Agent = require('../models/Agent');

// GET all complaints
router.get('/', async (req, res) => {
  const complaints = await Complaint.find().populate('assignedTo', 'name');
  res.json(complaints);
});

// PATCH: assign agent to complaint
router.patch('/:id/assign', async (req, res) => {
  const { agentId } = req.body;
  const complaintId = req.params.id;

  try {
    const agent = await Agent.findById(agentId);
    if (!agent) return res.status(404).json({ error: 'Agent not found' });

    const complaint = await Complaint.findByIdAndUpdate(
      complaintId,
      { assignedTo: agent._id },
      { new: true }
    ).populate('assignedTo', 'name');

    // Add complaint to agent's list
    agent.complaints.push(complaint._id);
    await agent.save();

    res.json(complaint);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Assignment failed' });
  }
});

module.exports = router;
