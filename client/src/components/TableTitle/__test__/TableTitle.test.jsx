import { render, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import ReactDOM from 'react-dom';
import { OrderedListOutlined } from '@ant-design/icons';
import renderer from 'react-test-renderer';
import TableTitle from '../TableTitle';

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

test('renders without crashing', () => {
  const div = document.createElement('div');

  const component = <TableTitle title="Title Of Table" />;

  ReactDOM.render(component, div);
  ReactDOM.unmountComponentAtNode(div);

  expect(global.console.error).toHaveBeenCalledTimes(0);

  const tree = renderer.create(component).toJSON();
  expect(tree).toMatchSnapshot();
});

test('render fails if no title prop given', () => {
  const div = document.createElement('div');
  const component = <TableTitle />;

  ReactDOM.render(component, div);

  expect(global.console.error).toHaveBeenCalledTimes(1);

  const tree = renderer.create(component).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders title prop and not the button', () => {
  const component = <TableTitle title="Title Of Table" />;

  const { getByText, queryAllByRole } = render(component);

  const titleElement = getByText(/Title Of Table/, {
    selector: 'h4.table-title-heading',
  });
  expect(titleElement).toBeInTheDocument();

  expect(queryAllByRole('button')).toHaveLength(0);

  expect(global.console.error).toHaveBeenCalledTimes(0);

  const tree = renderer.create(component).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders title prop and basic button', () => {
  const buttonProps = {
    label: 'My Button',
  };

  const component = (
    <TableTitle
      title="Title Of Table"
      button={buttonProps}
    />
  );

  const { getByText, queryAllByRole } = render(component);

  const titleElement = getByText(/Title Of Table/, {
    selector: 'h4.table-title-heading',
  });
  expect(titleElement).toBeInTheDocument();

  const buttonElement = getByText(buttonProps.label, {
    selector: 'h4.table-title-button button span',
  });
  expect(buttonElement).toBeInTheDocument();

  expect(queryAllByRole('button')).toHaveLength(1);

  expect(global.console.error).toHaveBeenCalledTimes(0);

  const tree = renderer.create(component).toJSON();
  expect(tree).toMatchSnapshot();
});

test('renders title prop and button with onClick handler', () => {
  const buttonProps = {
    label: 'Button With Callbac',
    onClick: jest.fn(),
  };

  const component = (
    <TableTitle
      title="Title Of Table"
      button={buttonProps}
    />
  );

  const { getByText, queryAllByRole } = render(component);

  const titleElement = getByText(/Title Of Table/, {
    selector: 'h4.table-title-heading',
  });
  expect(titleElement).toBeInTheDocument();

  const buttonElement = getByText(buttonProps.label, {
    selector: 'h4.table-title-button button span',
  });
  expect(buttonElement).toBeInTheDocument();

  expect(queryAllByRole('button')).toHaveLength(1);

  fireEvent.click(buttonElement);

  expect(buttonProps.onClick).toHaveBeenCalledTimes(1);

  expect(global.console.error).toHaveBeenCalledTimes(0);

  const tree = renderer.create(component).toJSON();
  expect(tree).toMatchSnapshot();
});

test('invalid icon to button', () => {
  const buttonProps = {
    label: 'Button With Callbac',
    onClick: jest.fn(),
    icon: 'asd',
  };

  const component = (
    <TableTitle
      title="Title Of Table"
      button={buttonProps}
    />
  );

  const { getByText, queryAllByRole } = render(component);

  const titleElement = getByText(/Title Of Table/, {
    selector: 'h4.table-title-heading',
  });
  expect(titleElement).toBeInTheDocument();

  const buttonElement = getByText(buttonProps.label, {
    selector: 'h4.table-title-button button span',
  });
  expect(buttonElement).toBeInTheDocument();

  expect(queryAllByRole('button')).toHaveLength(1);

  fireEvent.click(buttonElement);

  expect(buttonProps.onClick).toHaveBeenCalledTimes(1);

  expect(global.console.error).toHaveBeenCalledTimes(1);

  const tree = renderer.create(component).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Button with all props', () => {
  const buttonProps = {
    label: 'Button With Callbac',
    onClick: jest.fn(),
    icon: OrderedListOutlined,
  };

  const component = (
    <TableTitle
      title="Title Of Table"
      button={buttonProps}
    />
  );

  const { getByText, queryAllByRole } = render(component);

  const titleElement = getByText(/Title Of Table/, {
    selector: 'h4.table-title-heading',
  });
  expect(titleElement).toBeInTheDocument();

  const buttonElement = getByText(buttonProps.label, {
    selector: 'h4.table-title-button button span',
  });
  expect(buttonElement).toBeInTheDocument();

  expect(queryAllByRole('button')).toHaveLength(1);

  fireEvent.click(buttonElement);

  expect(buttonProps.onClick).toHaveBeenCalledTimes(1);

  expect(queryAllByRole('img')).toHaveLength(1);

  expect(global.console.error).toHaveBeenCalledTimes(0);

  const tree = renderer.create(component).toJSON();
  expect(tree).toMatchSnapshot();
});

test('Icon only button', () => {
  const buttonProps = {
    onClick: jest.fn(),
    icon: OrderedListOutlined,
  };

  const { getByText, queryAllByRole } = render(<TableTitle
    title="Title Of Table"
    button={buttonProps}
  />);

  const titleElement = getByText(/Title Of Table/, {
    selector: 'h4.table-title-heading',
  });
  expect(titleElement).toBeInTheDocument();

  const buttonElement = getByText('', {
    selector: 'h4.table-title-button button span',
  });
  expect(buttonElement).toBeInTheDocument();

  expect(queryAllByRole('button')).toHaveLength(1);

  fireEvent.click(buttonElement);
  fireEvent.click(buttonElement);

  expect(buttonProps.onClick).toHaveBeenCalledTimes(2);

  expect(queryAllByRole('img')).toHaveLength(1);

  expect(global.console.error).toHaveBeenCalledTimes(0);

  const tree = renderer.create(<TableTitle
    title="Title Of Table"
    button={buttonProps}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});

global.console = {
  ...global.console,
  error: jest.fn(),
};

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
