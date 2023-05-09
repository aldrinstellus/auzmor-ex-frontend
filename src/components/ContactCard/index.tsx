import React from 'react';
import Card from 'components/Card';
import Icon from 'components/Icon';
import Button, { Variant } from 'components/Button';

export interface IContactCardProps {}

const ContactCard: React.FC<IContactCardProps> = () => {
  return (
    <div>
      <Card className="p-6 rounded-9xl space-y-6">
        <div className="flex justify-between items-center">
          <div>Contact Info</div>
        </div>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex space-x-2">
              <div>
                <Icon name="people" />
              </div>
              <div>anish.sarkar@auzmor.com</div>
            </div>
            <div>
              <Icon name="people" />
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="flex space-x-2">
              <div>
                <Icon name="people" />
              </div>
              <div>anish.sarkar@auzmor.com</div>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <Button
            label="Organization Chart"
            variant={Variant.Secondary}
            className="px-16"
          />
        </div>
      </Card>
    </div>
  );
};

export default ContactCard;
