import { StatusCodes } from "http-status-codes";
import leadModel from "../../models/leadModels/lead.js";
import { leadSchemavalidate } from "../../schema_validation/leadValidation/leadValidate.js";

//  get own leads for perticular user
export const getMyLeads = async (req, res) => {
  try {
    const leads = await leadModel.find({ userId: req.userId });

    res.status(StatusCodes.OK).json({
      success: true,
      message: "Getting all leads successfully",
      data: { Leads: leads },
    });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST)
      .json({ success: false, message: "Error fetching leads", data: {} });
  }
};

// Add/ create lead

export const createMyLead = async (req, res) => {
  const { name, email, phoneNumber,status } = req.body;

  if (!name || !email) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      success: false,
      message: 'Name and Email are required',
      data: {},
    });
  }

 const leadData= await leadSchemavalidate.validateAsync({ name, email, phoneNumber,status });

  let Lead;

  //// for checking lead is already exits or not //////
  if (leadData?.phoneNumber) {
    Lead = await leadModel.findOne({ phoneNumber: leadData?.phoneNumber })
  }
  else if (leadData?.email) {
    Lead = await leadModel.findOne({ email: leadData?.email })
  }

  if (Lead) {
    return res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: "user already exist." })
  }


  try {
    const newLead = new leadModel({
      name,
      email,
      phoneNumber,
      status: status || 'New',
      userId: req.userId, // Ensure this matches the schema field
    });

    await newLead.save();

    res.status(StatusCodes.CREATED).json({
      success: true,
      message: 'Lead is created successfully',
      data: { lead: newLead },
    });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: 'Error adding lead',
      data: {},
    });
  }
};


export const deleteMyLead = async (req, res) => {
  console.log("my lead id", req.params);
  
  const { id } = req.params;

  try {
    const lead = await leadModel.findOneAndDelete({
      _id: id,
      userId: req.userId,
    });

    if (!lead) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ success:false, message: "Lead not found or unauthorized", data:{} });
    }

    res.status(StatusCodes.OK).json({ success:true, message: "Lead deleted successfully" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({success:false, message: "Error deleting lead", data:{}});
  }
};
