export const mockedNavigate = jest.fn();
export const mockedGoBack = jest.fn()

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: mockedNavigate,
    goBack: mockedGoBack,
  }),
}));

