import { useState, useEffect } from 'react'
import { Container, Row, Col, setConfiguration as setGridConfiguration } from 'react-grid-system'

import SceneList from './SceneList'
import SourceList from './SourceList'

setGridConfiguration({ gutterWidth: 0 })

export default function MainView() {
  const [ selectedScene, setSelectedScene ] = useState()

  return <Container fluid>
    <Row>
      <Col>
        <SceneList onSceneSelect={setSelectedScene} />
      </Col>
      <Col>
        <SourceList sceneName={selectedScene} />
      </Col>
    </Row>
  </Container>
}
