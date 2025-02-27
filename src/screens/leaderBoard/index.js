import { View, ScrollView, Image, ImageBackground, TouchableOpacity, } from 'react-native'
import React, { useContext, useState } from 'react'
import { CurveHeader, Label, GradientButton } from '@components'
import styles from './styles'
import { hp, COLORS, FONTS, width, wp } from '@utils/common'
import { useSelector } from 'react-redux'
import { commonStyles } from '@styles/commonStyles'
import { AppContext } from '../../contexts/appContext'
import { AuthContext } from '../../contexts/authContext'
import If from '../../components/if'
import { useEffect } from 'react'

const leaderBoardList = [{}, {}, {}, {}, {}, {}, {}, {}]

const LeaderBoard = (props) => {
    const theme = useSelector((state) => state.themeReducer.theme);
    const { leaderBoard , getMoreLeaderBoard, getLeaderBoard} = useContext(AppContext);
    const { userData, defaultAvatar } = useContext(AuthContext)

    // useEffect(() => {
    //  const unsubscribe =  props.navigation.addListener('focus', () => {
    //     getLeaderBoard()
    //     getMoreLeaderBoard()
    //     console.log("Hello")
    //  })
    //  return unsubscribe
    // }, [props.navigation])
    
    const PhotoFrame = (props) => {
        return (
            <>
                <If condition={leaderBoard?.length > props.rank - 1}>
                    <View style={[styles.photoFrame, props.style]}>
                        <Label style={{ fontSize: hp(1.6) }}>{props.rank == 2 ? '2nd' : '3rd'}</Label>
                        <View style={styles.imageCintainer}>
                            <Image
                                source={{ uri: leaderBoard[props.rank - 1]?.profileImage || defaultAvatar }}
                                style={{ flex: 1, borderRadius: wp(15) }}
                            />
                        </View>
                        <Label style={{ fontSize: hp(2), bottom: -2 }} singleLine={true}>{leaderBoard[props.rank - 1]?.name}</Label>
                        <Label style={{ fontSize: hp(1.7), marginVertical: -4 }}>Score</Label>
                        <Label style={{ fontSize: hp(2) }}>{leaderBoard[props.rank - 1]?.score}</Label>

                    </View>
                </If>
            </>
        )
    }

    return (
        <View style={styles.main}>
            <CurveHeader
                leftText={'Leaderboard'}
                showImage={true}
                onLeftPress={() => props.navigation.goBack()}
            />

            {/* CONTEXT */}
            <ScrollView>
                <Label font='h5' style={{ fontSize: hp(2.7), marginVertical: hp(1) }}>Leaderboard</Label>
                {/* TOP # CONTAINER */}
                <View style={styles.topThree}>
                    <PhotoFrame style={{ left: 2 }} rank={2} />

                    <View style={{ zIndex: 100, marginTop: hp(5) }}>
                        <If condition={leaderBoard?.length > 0}>
                            <>
                                <ImageBackground source={require('@images/firstFrame.png')}
                                    style={styles.topFrame}
                                >
                                    <View style={styles.topImage}>
                                        <Image
                                            source={{ uri: leaderBoard[0]?.profileImage || defaultAvatar }}
                                            style={{ flex: 1, borderRadius: wp(15) }}
                                        />
                                    </View>


                                </ImageBackground>
                                <Label style={{ fontSize: hp(2), bottom: -2 }}>{leaderBoard[0]?.name}</Label>
                                <Label style={{ fontSize: hp(1.7), marginVertical: -4 }}>Score</Label>
                                <Label style={{ fontSize: hp(2) }}>{leaderBoard[0]?.score}</Label>
                            </>
                        </If>
                    </View>

                    <PhotoFrame style={{ right: 0 }} rank={3} />
                </View>
                {/* END */}
                <View style={styles.headingConatiner}>
                    <Label style={{ fontSize: hp(1.8), color: COLORS._FFFFFF }}>Rank</Label>
                    <Label style={{ fontSize: hp(1.8), color: COLORS._FFFFFF }}>Name</Label>
                    <Label style={{ fontSize: hp(1.8), color: COLORS._FFFFFF }}>Highest score</Label>
                </View>
                {/* LIST OF TOP SCORERS */}
                <If condition={leaderBoard?.length > 3}>
                    {
                        leaderBoard.slice(3,15).map((player, index) => (
                            <View style={[styles.headingConatiner, styles.scorers]} key={index}>
                                <View style={[commonStyles._rowContainer, { width: '60%', justifyContent: 'flex-start', }]}>
                                    <Label font='h5' style={{ fontSize: hp(2.4), marginRight: '10%', width: '30%' }}>{player?.rank}</Label>
                                    <View style={[commonStyles._rowContainer,{ width: '100%', justifyContent:'flex-start'}]}>
                                        <Image
                                            source={{ uri: player?.profileImage || defaultAvatar }}
                                            style={{ width: hp(4.5), height: hp(4.5), borderRadius: hp(3) }}
                                        />
                                        <Label style={{ fontSize: hp(2), marginLeft: 10 }}>{player?.name}</Label>
                                    </View>
                                </View>
                                <Label font='h5' style={{ fontSize: hp(2.4), }}>{player?.score}</Label>
                            </View>
                        ))
                    }
                </If>
                <TouchableOpacity style={[styles.headingConatiner, styles.scorers, { justifyContent: 'center', marginBottom: 15 }]}
                onPress={() => getMoreLeaderBoard()}>
                    <Label style={{ fontSize: hp(1.7), color: COLORS._DDDDDD }}>Load more</Label>
                </TouchableOpacity>

            </ScrollView >
        </View >
    )
}

export default LeaderBoard