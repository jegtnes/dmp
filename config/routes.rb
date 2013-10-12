Dmp::Application.routes.draw do

  resources :journeys

  root to: 'journey#index'
end
