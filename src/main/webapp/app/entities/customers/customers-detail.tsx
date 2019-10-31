import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './customers.reducer';
import { ICustomers } from 'app/shared/model/customers.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICustomersDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CustomersDetail extends React.Component<ICustomersDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { customersEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Customers [<b>{customersEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">Name</span>
            </dt>
            <dd>{customersEntity.name}</dd>
            <dt>
              <span id="age">Age</span>
            </dt>
            <dd>{customersEntity.age}</dd>
            <dt>
              <span id="email">Email</span>
            </dt>
            <dd>{customersEntity.email}</dd>
            <dt>
              <span id="contact">Contact</span>
            </dt>
            <dd>{customersEntity.contact}</dd>
          </dl>
          <Button tag={Link} to="/entity/customers" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/customers/${customersEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ customers }: IRootState) => ({
  customersEntity: customers.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomersDetail);
