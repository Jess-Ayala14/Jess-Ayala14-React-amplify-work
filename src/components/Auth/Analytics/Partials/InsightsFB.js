import React, { useEffect } from 'react';
import { Nav, Row, Col, Card, Button } from 'react-bootstrap';
import { createStore } from 'state-pool';

const store = createStore();
store.setState("analyticsFB", []);


export const InsightsFB = (data) => {

    const loginFB = data['dataFromParent'][0];
    const ACCESS_TOKEN = data['dataFromParent'][1];
    const APICALLFB = 'me/insights?metric=page_engaged_users,page_impressions,page_post_engagements,page_posts_impressions'
    const [analyticsFB, setAnalytics] = store.useState("analyticsFB");

    useEffect(() => {

        if (loginFB !== false) {
            allInsights();
        }

    }, [ACCESS_TOKEN]);

    /*
    // me/insights?metric=page_total_actions
    // me/insights/page_total_actions/day
    // me/insights/page_total_actions/days_28
    // me/insights/page_total_actions/week

    
        FB 20749883427147142074988342714714
        Inst 17841406287465765
        page_engaged_users
        page_post_engagements
        page_impressions
        page_posts_impressions

        me/insights?metric=page_engaged_users,page_impressions,page_post_engagements,page_posts_impressions

        17841406287465765/insights?metric=impressions,reach,profile_views&period=day

        me?fields=instagram_business_account{media{id,permalink}}
       
        post
        17894903435627997/insights?metric=engagement,impressions,reach

    */

    function allInsights() {
        window.FB.api(
            APICALLFB,
            "GET",
            {
                access_token: ACCESS_TOKEN
            },
            function (response) {
                // Insert your code here
                console.log(response);
                setAnalytics(formatFB(getAnalyticsFB(response)))
            }

        );

        function getAnalyticsFB(response) {
            const insight = response['data']
            return insight
        }

        function formatFB(insights) {

            console.log(insights)
            const content = Object.keys(insights).map(key => {
                return (
                    [insights[key].name, insights[key].values, insights[key].title, insights[key].period, insights[key].description]
                );
            })

            return content
        }
    }


    function GetAnalyticsFB(props) {

        const FBinsights = props.analytics;
        const listItems = FBinsights.map((insight) =>
            <>
                <br />
                <Card className='card-insightFB'>
                    <Card.Title className='text-left'>{insight[0]}</Card.Title>
                    <Card.Body>
                        <Card.Text>
                            <p className='text-left'>{insight[1][0].value},  <b>{' date: '}</b>  {insight[1][0].end_time}</p>
                            <p className='text-left'>{insight[1][1].value}, <b>{' date: '}</b> {insight[1][1].end_time}</p>

                            <div>
                                <p className='text-left'>{insight[2]}  <b>{'  Period: '}</b>  {insight[3]}</p>
                                <p className='little-text text-justify'>{insight[4]}</p>
                            </div>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </>
        );

        return (
            <ul>{listItems}</ul>
        );

    }


    return (
        <>
            {loginFB == true
                ?
                <Row>
                    <Col xs={10} md={8} lg={4}>
                        <GetAnalyticsFB analytics={analyticsFB} />
                    </Col>
                    <Col xs={1} md={4} lg={8} />
                </Row>
                :
                <Row className="card-insight">
                    <Col xs={1} md={3} lg={4} />
                    <Col xs={10} md={6} lg={4}>
                        <br />
                        <Card className="card-insightFB">
                            <Card.Body className='text-center'>
                                <Card.Text>
                                    Please Authorize Facebook
                                </Card.Text>
                                <Button href='/Settings' className="btn-instagram">Go to settings</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col xs={1} md={3} lg={4} />
                </Row>
            }
        </>
    );

}

export default InsightsFB;