export interface JobApplicationCreatedEvent {
    applicationId: string;
  
    applicant: {
      fullName: string;
      email: string;
    };
  
    job: {
      id: string;
      title: string;
      team: string;
      level: string;
      type: string;
      location: string;
    };
  
    cvFileUrl: string;
  }