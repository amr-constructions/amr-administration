/* eslint-disable no-bitwise */
import Constants from '../../../constants/Constants';
import { buildResponseObject, initResponseObject } from '../../../services/Common';

const sampleDataIndividual = [
  {
    key: '1',
    id: '1',
    name: 'Test Labour',
    contact: '+91123456789',
    work_type: 2,
    fixed: 'Y',
    wage_per_day: '10',
    opening_balance: '10',
    created_by: 'Administrator',
    created_on: new Date().getTime(),
  },
  {
    key: '2',
    id: '2',
    name: 'Ravi',
    contact: '+919633263624',
    work_type: 4,
    fixed: 'N',
    wage_per_day: '850',
    opening_balance: '0',
    created_by: 'Jinesh',
    created_on: new Date().getTime(),
  },
  {
    key: '3',
    id: '3',
    name: 'Santhosh',
    contact: '+919532326324',
    work_type: 6,
    fixed: 'Y',
    wage_per_day: '900',
    opening_balance: '0',
    created_by: 'Administrator',
    created_on: new Date().getTime(),
  },
];

const sampleDataGroup = [
  {
    key: '1',
    id: '1',
    name: 'Test Labour',
    contact: '+91123456789',
    work_type: 1,
    fixed: 'Y',
    wage_per_day: '10',
    opening_balance: '10',
    created_by: 'Administrator',
    created_on: new Date().getTime(),
    leader: 'Y',
    group_id: 1,
  },
  {
    key: '2',
    id: '2',
    name: 'Ravi',
    contact: '+919633263624',
    work_type: 8,
    fixed: 'N',
    wage_per_day: '850',
    opening_balance: '0',
    created_by: 'Jinesh',
    created_on: new Date().getTime(),
    leader: 'N',
    group_id: 1,
  },
  {
    key: '3',
    id: '3',
    name: 'Santhosh',
    contact: '+919532326324',
    work_type: 5,
    fixed: 'Y',
    wage_per_day: '900',
    opening_balance: '0',
    created_by: 'Administrator',
    created_on: new Date().getTime(),
    leader: 'N',
    group_id: 1,
  },
];

const prepareTreeStructure = (flatStructure) => {
  /* Make Leader-Member Relation from flat Structure */
  const leaders = [];
  const members = new Map();

  flatStructure.forEach((labour) => {
    if (labour.leader === 'Y') {
      leaders.push({
        ...labour, children: [],
      });
    } else {
      const { group_id: groupId } = labour;
      if (!members.has(groupId)) {
        members.set(groupId, [ labour ]);
      } else {
        members.set(groupId, members.get(groupId).concat(labour));
      }
    }
  });

  leaders.forEach((leader) => {
    if (members.has(leader.group_id)) {
      leader.children.push(...members.get(leader.group_id));
    }
  });

  return leaders;
};

export default async (labourType) => {
  const response = initResponseObject();

  if (!labourType) {
    buildResponseObject(response, Constants.LABOURS_MGMT.MODULE, 501);
  } else if (sampleDataIndividual == null) {
    buildResponseObject(response, Constants.LABOURS_MGMT.MODULE, 500);
  } else {
    response.data = [];
    if (labourType & Constants.LABOURS_MGMT.LABOUR_TYPES.INDIVIDUAL_LABOUR) {
      response.data.push(...sampleDataIndividual);
    }

    if (labourType & Constants.LABOURS_MGMT.LABOUR_TYPES.GROUP_LABOUR) {
      response.data.push(...prepareTreeStructure(sampleDataGroup));
    }
  }

  return response;
};
