import React from 'react';
import Card from 'components/Card';
import Icon from 'components/Icon';
import Button, { Variant } from 'components/Button';
import Email from 'images/Email.svg';
import Copy from 'images/Copy.svg';
import Phone from 'images/Phone.svg';

export interface IContactCardProps {
  email?: string;
  contact?: string;
}

const ContactCard: React.FC<IContactCardProps> = ({ email, contact }) => {
  return (
    <div>
      <Card className="p-6 rounded-9xl space-y-6">
        <div className="flex justify-between items-center">
          <div>Contact Info</div>
        </div>
        <div className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex space-x-2">
              {/* <div>
                <Icon name="people" />
              </div> */}
              <img src={Email} alt="" />
              <div>{email}</div>
            </div>
            {/* <div>
              <Icon name="people" />
            </div> */}
            <img src={Copy} alt="" />
          </div>
          <div className="flex space-x-4">
            <div className="flex space-x-2">
              {/* <div>
                <Icon name="people" />
              </div> */}
              <img src={Phone} alt="" />
              <div>{contact}</div>
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
