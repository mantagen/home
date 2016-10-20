module Home exposing (..)
import Html exposing (..)
import Html.Attributes exposing (..)

-- MAIN
main : Html a
main =
  rmc

center : Attribute msg
center =
  style
    [ ("textAlign", "center")
    ]

-- VIEW
rmc : Html a
rmc =
  div []
    [ h1 [ center ] [ text "ronan mccabe" ]
    , p [ center ] [ text "full stack javascript developer, living in london, looking for contract roles" ]
    , p [ center ] [ text "cv available upon request" ]
    , p [ center ] [ text "github" ]
    , p [ center ] [ text "twitter" ]
    , p [ center ] [ text "linkedin" ]
    ]
