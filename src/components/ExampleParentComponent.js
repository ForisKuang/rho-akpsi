import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Select from 'react-select';
import Loader from 'react-loader-spinner';
import HeaderBar from './HeaderBar';
import NoMatchesYet from './NoMatchesYet';
import MatchCard from './MatchCard';
import Colors from '../constants/Colors';
import MatchesData from '../test_data/MatchesData';

const MatchesWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
`;

const SelectWrap = styled.div`
  width: 300px;
  margin: 10px 0px 30px 0px;
`;

class Matches extends Component {
  constructor() {
    super();
    this.state = {
      hasLoadedMatches: false, // display loading indicator until server fetch is complete
      selectedOption: null
    };
    this.selectOptions = [];
  }

  componentDidMount() {
    // TODO: perform server fetch to get matches
    // set hasLoadedMatches to true in server callback
    // for now, we're just loading a test matches object from a file

    // set default selection when component mounts
    this.constructDropdownSelections();
    const defaultSelection = this.selectOptions.length ? this.selectOptions[0] : null;
    this.setState({ selectedOption: defaultSelection });

    setTimeout(() => {
      // simulate loading for 0.5 s
      this.setState({ hasLoadedMatches: true });
    }, 500);
  }

  onSelectChange(selectedOption) {
    this.setState({ selectedOption });
  }

  constructDropdownSelections() {
    // construct list of entries that will be shown in dropdown selection
    const { dbUser } = this.props;
    this.selectOptions = [];
    if (dbUser) {
      const { userProfile, friendProfiles } = dbUser;

      // only show Me option if user profile is active
      if (userProfile && userProfile.isActive) {
        this.selectOptions.push({
          value: userProfile.profileId,
          label: `Me (${userProfile.name})`
        });
      }

      friendProfiles.forEach(fp => {
        this.selectOptions.push({
          value: fp.profileId,
          label: `${fp.name}`
        });
      });
    }
  }

  render() {
    const { hasLoadedMatches, selectedOption } = this.state;

    let selectedMatches = {};
    if (selectedOption) {
      // take matches for selected profile
      selectedMatches = MatchesData[selectedOption.value];
    } else {
      // selectedOption is null due to dbUser not being available
      // reconstruct selection options
      this.constructDropdownSelections();
    }

    return (
      <div>
        <HeaderBar />
        <MatchesWrap>
          <h1>Matches</h1>
          <SelectWrap>
            <Select
              options={this.selectOptions}
              onChange={s => this.onSelectChange(s)}
              value={selectedOption}
              theme={theme => ({
                ...theme,
                borderRadius: 0,
                colors: {
                  ...theme.colors,
                  primary: Colors.BLACK, // selected color
                  primary25: Colors.WHITE, // hover color
                  primary50: Colors.WHITE, // click color
                  primary75: Colors.WHITE
                }
              })}
            />
          </SelectWrap>
          {hasLoadedMatches ? (
            <div>
              {Object.keys(selectedMatches).length ? (
                <div>
                  {Object.keys(selectedMatches).map(matchId => (
                    <MatchCard
                      key={matchId}
                      matchId={matchId}
                      profile={
                        selectedOption.value === selectedMatches[matchId][0].profileId
                          ? selectedMatches[matchId][1]
                          : selectedMatches[matchId][0]
                      }
                    />
                  ))}
                </div>
              ) : (
                <NoMatchesYet />
              )}
            </div>
          ) : (
            <Loader type="Oval" height="60" width="60" color={Colors.PRIMARY} />
          )}
        </MatchesWrap>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { dbUser } = state.reduxProps;

  return {
    dbUser
  };
};

export default connect(mapStateToProps)(Matches);

