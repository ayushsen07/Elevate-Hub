const ServiceModel = require("../models/service.model");
const httpStatus = require("../utils/httpStatus");
const ApiError = require("../helper/apiError");
const serviceService = require("../services/service.service");

const createService = async (req, res, next) => {
  try {
    const mentorId = req.user._id;
    const { serviceName, description, duration, price } = req.body;
    // console.log(`service details is: ${serviceName}`);
    

    const service = await serviceService.createService({
      mentor: mentorId,
      serviceName,
      description,
      duration,
      price,
    });
    // console.log(`service details are  ${service}`);
    

    res.status(httpStatus.created).json({
      success: true,
      message: "Service created successfully",
      service,
    });
  } catch (error) {
    next(error);  // Pass the error to the global error handler
  }
};

const updateService = async (req, res, next) => {
  try {
    // console.log('in the controller');
    
    const serviceId = req.params.serviceId;
    const mentorId = req.user._id;
    const { name, description, duration, price, active } = req.body;
    // console.log('updated service are',name,description,duration,price);
    

    const updatedService = await serviceService.updateService(
      serviceId,
      mentorId,
      { name, description, duration, price, active }
    );

    if (!updatedService) {
      throw new ApiError(
        httpStatus.notFound,
        "Service not found"
      );
    }

    res.status(httpStatus.ok).json({
      success: true,
      message: "Service updated successfully",
      service: updatedService,
    });
  } catch (error) {
    next(error);  // Pass the error to the global error handler
  }
};

const getServiceByMentor = async (req, res, next) => {
  try {
    console.log(`from the controoler`);
    
    const mentorId = req.user._id;
    const services = await serviceService.getServiceByMentor(mentorId);

    if (!services || services.length === 0) {
      return res.status(httpStatus.notFound).json({
        success: false,
        message: "No services found for this mentor",
      });
    }

    res.status(httpStatus.ok).json({
      success: true,
      services,
    });
  } catch (error) {
    next(error);  // Pass the error to the global error handler
  }
};


const getServiceById = async (req, res, next) => {
  const serviceId = req.params.serviceId;
  const service = await serviceService.getServiceById(serviceId);

  res.status(httpStatus.ok).json({
    success: true,
    service,
  });
};

module.exports = {
  createService,
  updateService,
  getServiceByMentor,
  getServiceById,
};
