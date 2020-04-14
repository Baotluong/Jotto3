import React from 'react';
import { shallow } from 'enzyme';
import { DashboardPage } from '../../components/DashboardPage';

let wrapper, instance;

beforeEach(() => {
  wrapper = shallow(<DashboardPage />);
  instance = wrapper.instance();
})

class TestDashboardPage extends DashboardPage {
  constructor(props) {
    super(props);
    this.startTwoPlayerGame = this.props.startTwoPlayerGame;
  }
}

describe('DashboardPage', () => {
  test('should render DashboardPage correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  
  test('should call startGame(true) when startSinglePlayerGame is called', () => {
    const startGameMock = jest.fn();
    instance.startGame = startGameMock;
    instance.startSinglePlayerGame();
    expect(startGameMock).toHaveBeenLastCalledWith(true);
  });

  test('should call startGame(false) when startSinglePlayerGame is called', () => {
    const startGameMock = jest.fn();
    instance.startGame = startGameMock;
    instance.startTwoPlayerGame();
    expect(startGameMock).toHaveBeenLastCalledWith(false);
  });

  test('should call props.startGame', () => {
    const gameID = '123';
    const startGameMock = jest.fn().mockResolvedValue(gameID);
    const wrapper = shallow(<DashboardPage startGame={startGameMock} />);
    const instance = wrapper.instance();
    instance.startGame(true);
    expect(startGameMock).toHaveBeenLastCalledWith(true);
  })

  test('should call startTwoPlayerGame on button click', () => {
    const startTwoPlayerGameMock = jest.fn();
    const wrapper = shallow(<TestDashboardPage startTwoPlayerGame={startTwoPlayerGameMock} />);
    wrapper.find('.dashboard__button__versus').simulate('click');
    expect(startTwoPlayerGameMock).toHaveBeenCalled();
  })
});