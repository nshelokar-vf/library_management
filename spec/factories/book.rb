FactoryBot.define do
  factory :book do
    title { "Sample Title" }
    author { "Sample Author" }
    description { "Sample Description" }
    association :user
  end
end
