import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EVENT_NAMES } from '../../../common/events/event-names';
import { MailService } from '../../mail/mail.service';
import type { JobApplicationCreatedEvent } from 'src/common/interfaces/job-application-created-event.interface';

@Injectable()
export class JobApplicationListener {
  private readonly logger = new Logger(JobApplicationListener.name);

  constructor(private readonly mailService: MailService) {}

  /**
   * Handles the JOB_APPLICATION_CREATED event.
   * Sends a notification email to admin when a new job application is submitted.
   * @param payload - JobApplicationCreatedEvent containing application and applicant details.
   */
  @OnEvent(EVENT_NAMES.JOB_APPLICATION_CREATED, { async: true })
  async handleJobApplicationCreated(payload: JobApplicationCreatedEvent) {
    try {
      await this.mailService.sendJobApplicationToAdmin(payload);
      this.logger.log(`Application email sent: ${payload.applicationId}`);
    } catch (error) {
      this.logger.error(
        `Failed to send application email: ${payload.applicationId}`,
        error,
      );
    }
  }
}